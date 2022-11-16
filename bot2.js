require('dotenv').config();
const fs=require('fs');
const Discord = require('discord.js');
const {PREFIX, LoginBotToken, OWNER_ID, activityString}=require("./GlobalVariable");

const moment = require('moment');
const Queue = require('queue-fifo');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul"); //서울 시간

const bot = new Discord.Client(); //봇
bot.commands = new Discord.Collection(); //명령어 모음집
bot.guildCmdQueue = new Discord.Collection(); //길드 명령어큐

let commandFiles=new Array();
function banbok(dirPath){//재귀로 파일 찾는 함수
	fs.readdirSync(dirPath,{withFileTypes:true}).filter((file)=>{
		if(file.isDirectory()==true) banbok(`${dirPath}/${file.name}`);
		else commandFiles.push(`${dirPath}/${file.name}`);
	});
} banbok('./src/Commands');//그리고 그것을 실행

for (const file of commandFiles) {//명령어 라이브러리 만드는 반복문
	const command = require(file);
	if(command.cmd!=undefined)
		command.cmd.forEach((elem)=>{
			if(bot.commands.get(elem)) throw `"${elem}" 명령어 중복\n"${bot.commands.get(elem).name}" , "${elem}"`;
			bot.commands.set(elem, command);
		});
}

bot.on('ready', async () => {//정상적으로 작동하는지 출력하는 코드
    console.log(`${bot.user.tag}님이 로그인했습니다.`);
    bot.user.setActivity(activityString, { type: 'PLAYING' });

    exports.bot=bot;
	require("./src/botAlarm");
});

let canExecute=true; exports.canExecute=canExecute;
bot.on('message', async (msg) => {//명령어 있는 텍스트
    if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;
	
	if(bot.guildCmdQueue.get(msg.guild.id)==undefined)//길드 명령어 큐 만들기
		bot.guildCmdQueue.set(msg.guild.id, true);
	const args = msg.content.slice(PREFIX.length).trim().split(/\s+/);
	const command = args.shift();
    if (!bot.commands.get(command)) {msg.channel.send("명령어를 인식하지 못했어요 ㅠㅠ 명령어를 다시 한 번 확인해주세요!"); return;}
    try {
		if(bot.commands.get(command).type=="music"){//노래봇은 최신 버전이어야만 쓸 수 있음
			const verCheck=await require("./src/Commands/music/musicVerCheck").verCheck();
			if(!verCheck){
				msg.channel.send("노래봇 버전이 안 맞아서 지원이 어렵네요. 해당작업은 아직 개발자의 무지함으로 인해 수작업으로 처리해야 합니다, 최대한 빨리 업데이트 해드릴게요, 양해부탁드립니다 ㅠㅠ");
				bot.users.cache.get(OWNER_ID).send(`노래봇 업데이트 필요\nnpm install ytdl-core@latest`);
			}
		}
		bot.commands.get(command).execute(msg, args);
	} catch (error) {
		msg.channel.send(`${command} 명령어 입력에 문제가 생겼어요! 우리 주인님이 고생할 거라 생각하니 기분이 좋네요 ㅎㅎ\n${error}`);
		bot.users.cache.get(OWNER_ID).send(`명령어 입력 문제 : ${bot.commands.get(command).name}\n${error}`);
		console.error(error);
	}
});

bot.on('message', async (msg) => {//명령어 없는 텍스트
    if (msg.content.startsWith(PREFIX) || msg.author.bot) return;
	//const args = msg.content.trim().toLowerCase().split(/\s+/);

	if(msg.content.toLocaleLowerCase().includes("vs")){//vs 기능
		let vsArr = msg.content.trim().split(/\s*vs\s*/gim);//vs 검색해서 나누기
		vsArr=[...new Set(vsArr)].filter(elem=>elem!=='');//이거중복임 뜻) 검사한다는 뜻
		if(vsArr.length==0) msg.channel.send("의미 있는 입력 값이 없네요.");//아무것도 없으면
		else msg.channel.send(vsArr[Math.floor(Math.random()*vsArr.length)]);//랜덤해서 하나 보내기
	}
});

process.on('unhandledRejection',(err)=>{//app crash걸렸을 때 실행되는 코드
	bot.users.cache.get(OWNER_ID).send(`에러떴다ㅏㅏㅏㅏㅏ\n${err}\n`);
	console.error(err);
});

bot.login(LoginBotToken);