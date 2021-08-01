require('dotenv').config();
const fs=require('fs');
const Discord = require('discord.js');
const {PREFIX, LoginBotToken, OWNER_ID, activityString}=require("./GlobalVariable");

const moment = require('moment');
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

bot.on('message', async (msg) => {
	if(msg.author.bot) return;//봇은 거름
    if(!msg.content.startsWith(PREFIX)) return noCmd(msg);//명령어 없는 텍스트
	
	const args = msg.content.slice(PREFIX.length).trim().split(/\s+/);//명령어 말 배열에 담기
	const command = args.shift();//명령어 인식할 거

    if (!bot.commands.get(command))//명령어 인식 못하는 거 거름
		return msg.channel.send("명령어를 인식하지 못했어요 ㅠㅠ 명령어를 다시 한 번 확인해주세요!");

	if(bot.guildCmdQueue.get(`${msg.guild.id}${bot.commands.get(command).type}`)==undefined)//길드 명령어 큐 만들기
		await bot.guildCmdQueue.set(`${msg.guild.id}${bot.commands.get(command).type}`, new Array());
    
		const checkGuildCmdQueue=bot.guildCmdQueue.get(`${msg.guild.id}${bot.commands.get(command).type}`);
	try {
		if(bot.commands.get(command).type=="music"){//노래봇은 최신 버전이어야만 쓸 수 있음
			const tmp=await require("./src/Commands/music/musicVerCheck").verCheck(); if(tmp) return;}

		if(checkGuildCmdQueue.length==0){ //아무것도 실행 안 되어 있으면 실행
			checkGuildCmdQueue.push(bot.commands.get(command));//명령어 입력 중임을 알림
			
			await bot.commands.get(command).execute(msg, args);//실행이 끝날 때까지 대기
			checkGuildCmdQueue.shift();//명령어 끝나면 대기열 제거
		} else //뭐가 실행 중이면 실행
			msg.channel.send(`${checkGuildCmdQueue.name} 명령어 입력 대기 중이라 잠시 뒤에 다시 부탁드립니다 ㅎㅎ`);
	} catch (error) {
		msg.channel.send(`${command} 명령어 입력에 문제가 생겼어요! 우리 주인님이 고생할 거라 생각하니 기분이 좋네요 ㅎㅎ\n${error}`);
		bot.users.cache.get(OWNER_ID).send(`명령어 입력 문제 : ${bot.commands.get(command).name}\n${error}`);
		console.error(error);
	}
});

async function noCmd(msg){//명령어 없는 텍스트
	if(msg.content.toLocaleLowerCase().includes("vs")){//vs 기능
		if(msg.content.includes("https://")) return;
		
		let vsArr = msg.content.trim().split(/\s*vs\s*/gim);//vs 검색해서 나누기
		vsArr=[...new Set(vsArr)].filter(elem=>elem!=='');//이거중복임 뜻) 검사한다는 뜻
		if(vsArr.length==0) msg.channel.send("의미 있는 입력 값이 없네요.");//아무것도 없으면
		else msg.channel.send(vsArr[Math.floor(Math.random()*vsArr.length)]);//랜덤해서 하나 보내기
	}
};

process.on('unhandledRejection',(err)=>{//app crash걸렸을 때 실행되는 코드
	bot.users.cache.get(OWNER_ID).send(`에러떴다ㅏㅏㅏㅏㅏ\n${err}\n`);
	console.error(err);
});

bot.login(LoginBotToken);