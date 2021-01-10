require('dotenv').config();

const {Client, Discord} = require('discord.js');
const Queue = require('queue-fifo');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul"); // 서울 시간

const bot = new Client();

const PREFIX="ㅣ";
const PREFIX_REACTION_MF="@#$4578$#@"; // 중지 이모지 반응용(중지 날린 곳에 지문 남긴 것)

const MORMOTTE_ID="751773063766343721";

var dobeTimeCheck=new Queue(); // 얍 명령어 도배 시간 체크 큐
var dobeCheck=new Queue();

var msgMiddleFinger=0; // 중지 이모지 반응용 변수
var nagaStance=0; // 나가라고 전에 삼고초려 변수

const helpEmbed = {
    color: 0xF7CAC9,
    author: {
        name: '민둘봇의 명령어 안내',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
        url: 'https://www.youtube.com/channel/UCNqyvS8P82pGJ_4YyHIl7Zw',
    },
    description: '명령어는 이런 것들이 있어요.\n 명령어 전에는 "' + PREFIX + '" 를 입력하세요!',
    fields: [
        {
            name: 'ping',
            value: 'pong으로 대답해요.\n(숨은 명령어 : 뒤집어서 써도 상관없어요!)',
            inline: false,
        },
        {
            name: '민둘',
            value: '"민둘이는 바보"로 대답해요.\n그런데 화내면 앞에 말했던 것들을 수정해요. (숨은 명령어)',
            inline: true,
        },
        {
            name: '맨둘',
            value: '"맨둘이는 집나갔음."으로 대답해요',
            inline: true,
        },
        {
            name: '얍',
            value: '얍으로 대답해요.',
            inline: false,
        },
        {
            name: '시간',
            value: '시간을 대답해요.',
            inline: true,
        },
        {
            name: '날짜',
            value: '날짜를 대답ㅎ',
            inline: true,
        },
        {
            name: '나가',
            value: '민둘봇이 방을 나가요.',
            inline: false,
        },
    ],
    timestamp: new Date(),
    footer: {
        text: 'instagram @mindul_mendul ',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
    },
};

bot.on('ready', async () => {
    console.log(`${bot.user.tag}님이 로그인했습니다.`);
    console.log(moment().format("YYYY년 MM월 DD일 HH시 mm분 ss초"));
});

<<<<<<< HEAD
<<<<<<< HEAD
=======
setInterval( (time)=>{
    }
);
=======
var http = require("http");
setInterval(function() {
    http.get("http://mindulbot.herokuapp.com");
}, 10*60*1000); // every 5 minutes (300000)
>>>>>>> 6ecc80ba (뭔가 문제가 있었나본데, 10분마다 갱신되는 거 다시 올림)

>>>>>>> 52f94846 (command 파일을 json으로 변경함)
bot.on('messageReactionAdd', async (reaction, user) => {
    const { name } = reaction.emoji;
    const member=reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id > 1){
        switch(name){
            case '🖕':
                var msgAuthorID=reaction.message.channel.messages.cache.get(reaction.message.id).member.user.id;
                if(msgAuthorID===bot.user.id){
                    msgMiddleFinger=(await reaction.message.channel.send(`${member} 너도 받아라🖕`)).id;
                    reaction.message.content+=PREFIX_REACTION_MF+msgMiddleFinger;
                } else {
                    reaction.message.channel.send('우헤헿 꼴 좋다 ㅋㅋㅋㅋ');
                }
            break;
        }
    }
});

bot.on('messageReactionRemove',async (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id > 1){
        switch(name){
            case '🖕':
                var msgAuthorID=reaction.message.channel.messages.cache.get(reaction.message.id).member.user.id;
                if(msgAuthorID === bot.user.id){
                    const idIndex=reaction.message.content.indexOf(PREFIX_REACTION_MF);
                    msgMiddleFinger=reaction.message.content.substring(idIndex+PREFIX_REACTION_MF.length);
                    reaction.message.content=reaction.message.content.substring(0,idIndex);
                    reaction.message.channel.messages.delete(msgMiddleFinger);
                    reaction.message.channel.send(`${member} 그래, 알았으면 됐다.`);
                }
            break;
        }
    }
});

// ! 명령어 모음
bot.on('message', async (msg) => {
    console.log(msg.member.id);
    if(msg.author.bot){return;}
    if(msg.channel.type==="dm"){
        if(msg.author!=bot.user){
            (await msg.channel.send("DM은 명령어 안통함 ㅅㄱ"));
        } return;
    }
<<<<<<< HEAD
    msg.content.toLowerCase();
    if(msg.content.startsWith(PREFIX)){//명령어 어두 감지
        const [CMD_NAME, ...args] = msg.content//문장 정리
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
=======
    msg.content.toLowerCase();//대소문자 구분 없애게
    if(msg.content.startsWith(PREFIX)){//명령어 어두 감지
        const [CMD_NAME, ...args] = msg.content.trim().substring(PREFIX.length).split(/\s+/);//문장 정리
        const Command=require('./Command/Command.json');
        const cmd = Object.keys(Command).find( (property) => //Command.js 파일에서 모든 프로퍼티를 문자배열화 시킴
            Command[property].find( element=>element==CMD_NAME )!=undefined// 그 프로퍼티 배열 안에서 CMD_NAME과 같은 문자열 찾기
        );
>>>>>>> 52f94846 (command 파일을 json으로 변경함)

        //코드 시작
        switch(CMD_NAME){
            case '나가':
            case 'skrk':
            case '낙아':
            case 'ㄴ가ㅏ':
            case 'ㄴㄱ':
            case '나가라고':
            var GuildNaga = bot.guilds.cache.find( (guild)=>
                guild.name==="Party of Yecheon"
            );
            if(GuildNaga!=null){
                if(nagaStance++>=3) {
                    (await msg.channel.send("안녕히 계세요~"));
                    GuildNaga.leave();
                } else {
                msg.channel.send("안나갈 건데? ㅋㅋㅋㅋㅋ"+nagaStance+"트");
                }
            } else {
                msg.channel.send("안녕히 계세요~");
                GuildNaga.leave();
            }
            break;

            case 'ㅇㅋ':
                console.log("개발");
                nagaStance=0;
            break;

            case "시간":
            case "tlrks":
            case "ㅅㄱ":
            case "tr":
            case "time":
            case "샤ㅡㄷ":
            case "now":
            case "ㅜㅐㅈ":
                if(msg.author.tag == "박민규#7504"){ // 나
                    msg.channel.send("명을 받들게 되어 망극하옵나이다.\n"
                    +moment().format("지금 시각은 HH시 mm분이옵니다, 주인님"));
                } else if (
                     msg.author.tag == "전정효#2520"       //파리 현지인 1
                  || msg.author.tag == "퍄퍄파이#0247"     //파리 현지인 2
                ){
                    if(Math.random()>0.3){
                        msg.channel.send("파리의 시간을 사는 당신에 맞춰 보여드립니다.(-8시간)\n"
                        +moment().add(-8,"hours").format("지금 시각은 HH시 mm분입니다."));
                    } else {
                        msg.channel.send("LA의 시간을 사는 당신에 맞춰 보여드립니다.(-17시간)\n"
                        +moment().add(-17,"hours").format("지금 시각은 HH시 mm분입니다."));
                    }
                } else { // 정상인
                    msg.channel.send(moment().format("지금 시각은 HH시 mm분입니다."));
                }
            break;

            case "날짜":
            case "skfWk":
            case "ㄴㅉ":
            case "sW":
                if(msg.author.id===OWNER_ID){
                    msg.reply(moment().format("오늘은 MM월 DD일(dddd) 입니다, 주인님."));
                } else {
                console.log(msg.author.username);
                    msg.channel.send("날짜는 달력 찾아봐.");
                }
            break;

            case '얍':
            /*
            얍 명령어는 키 연속 입력 시의
            시간을 계산하는 기능 테스트 명령어입니다.
            만약 도배가 예상된다면 이 기능을 더 만들 예정입니다.
            */
            case 'diq':
            case 'yap':
            case 'ヤップ':
                var tempTimeCheck=msg.createdTimestamp;
                dobeTimeCheck.enqueue(tempTimeCheck);
                if(dobeTimeCheck.size()<5){
                    msg.reply("얍");
                } else {
                    var delayTime = Math.round((tempTimeCheck-dobeTimeCheck.dequeue())/1000);
                    console.log(delayTime+"초");
                    if(delayTime<=8){
                        if((await msg.channel.messages.cache.last()).author.username!="민둘봇"){
                            dobeCheck.enqueue((await msg.channel.send("메시지가 너무 빨리 달려요")).id);
                            if(dobeCheck.size()>3){//메시지 경고창이 도배가 될 경우 방지
                                msg.channel.messages.delete(dobeCheck.dequeue());
                            }
                        }
                        msg.delete();
                    }
                }
            break;

            case 'ping':
            case 'ㅔㅑㅜㅎ':
                msg.reply('Pong!');
            break;

            case 'gnip':
            case '후ㅑㅔ':
                msg.reply('!gnoP');
            break;

            case '민둘':
            case 'alsenf':
            case '민규':
                msg.channel.send('민둘이는 바보');
            break;

            case '맨둘':
            case 'aosenf':
                msg.channel.send('맨둘이는 집나갔음');
            break;
            
            case '민둘!':
            case 'ㅡㅡ':
            case '뭐하냐':
            case '제대로 말해라':
                var msg_edit = msg.channel.messages.cache.find( (message) =>
                    message.content==="민둘이는 바보"
                );
                if(msg_edit!=undefined){
                    msg.channel.send("화내지 마라;;");
                } else {
                    while(msg_edit!=undefined){
                        (await msg_edit.edit("민둘이는 천재"));//수정 후
                        msg_edit = msg.channel.messages.cache.find( (message) =>
                            message.content==="민둘이는 바보"
                        );//리서치
                    }
                    msg.channel.send("미안, 뒤에 다 수정함 ㅋㅋ");
                }
            break;

            case "도움말":
            case "ㄷㅇㅁ":
            case "help":
                msg.channel.send({ embed: helpEmbed });
            break;
            /*
            case '킥':
            case 'ㅋ':
            case 'kick'://쫓아내기
                if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply('명령어에 대한 권한이 없습니다.');
                var memberKick;
                if(args.length === 0) {//입력 없으면 모르모트 ㅂㅂ
                    args[0]=MORMOTTE_ID;
                } else {//입력 있으면 입력있는 친구가 나가야지
                    args[0]=msg.guild.members.cache.find(
                        (member) => member.user.username===args[0]
                    ).user.id;
                }

                memberKick=msg.guild.members.cache.get(args[0]);
                if(memberKick){//킥하는 구간
                    memberKick
                     .kick()
                     .then((memberKick) => msg.channel.send(`${memberKick} 님이 추방당했습니다^^`))
                     .catch((err) => console.log(err));
                } else {//아이디가 제대로 입력 안됐을때
                    msg.reply('아이디를 제대로 입력해주세요 ㅎㅎ');
                }
            break;
            
            case '벤':
            case 'ㅂ':
            case 'ban'://밴

                if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply('명령어에 대한 권한이 없습니다.');
                if((args.length === 0)) args[0]=MORMOTTE_ID;
                
                try {
                    const memberBan = await msg.guild.members.ban(args[0]);
                    msg.channel.send(`${memberBan} 님이 벤 당했습니다^^`);
                    console.log(memberBan);
                } catch (err) {
                    console.log(err);
                    msg.channel.send('아이디를 제대로 입력해주세요 ㅎㅎ');
                }
            break;

            case 'who':
                if((args.length === 0)) args[0]=MORMOTTE_ID;

                const memberWho=msg.guild.members.cache.get(args[0]);
                if(memberWho){
                    msg.channel
                    .send(`${memberWho}`)
                    .catch((err) => console.log(err));
                } else {
                    msg.reply('아이디를 제대로 입력해주세요 ㅎㅎ');
                }
            break;
            */
        }
    } else {//명령어 어두 비감지
        const CMD_Array= msg.content.trim().split(/\s+/); // 정규 표현식 공부하기
        const psudoCommand=require('./Command/PsudoCommand.json');
        const cmd = Object.keys(psudoCommand).find( (property) => //Command.js 파일에서 모든 프로퍼티를 문자배열화 시킴
            psudoCommand[property].find(element=>CMD_Array.includes(element))!=undefined// 그 프로퍼티 배열 안에서 CMD_Array에 있는 인자와 같은 문자열 찾기
        );
        //코드 시작
        switch(cmd){
            case '아님':
                msg.channel.send('맞는데?');
            break;

            case '한로원':
                msg.channel.send("로바~");
            break;

            case '로바':
                msg.channel.send("로원 바보라는 뜻~");
            break;
            
            case '레순튀':
                msg.channel.send("레또팅!!");
            break;
        }
    }
});

bot.on('guildMemberAdd',async (member) => {
    console.log(`${member.user.tag}: 접속`);
});

bot.login(process.env.BOT_TOKEN);