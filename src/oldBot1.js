require('dotenv').config();

const {Client} = require('discord.js');
const moment = require('moment');
<<<<<<< HEAD
<<<<<<< HEAD
=======
const { CommandNaga } = require('./Commands/basic/CommandNaga');
>>>>>>> d1b3cbb3 (펀치킹 알림기능 완성!)
=======
>>>>>>> 8c0086a3 (음악봇 제작 시작)
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul"); //서울 시간
require('./botAlarm');

const bot = new Client();
<<<<<<< HEAD
<<<<<<< HEAD:src/bot.js
<<<<<<< HEAD
<<<<<<< HEAD
=======
const GV=require("../GlobalVariable");
>>>>>>> 67f199ac (노래봇 자잘한 거 다 고침):src/oldBot1.js
=======
<<<<<<< HEAD:src/oldBot1.js
const GV=require("../GlobalVariable");
=======

const GV = require("./../GlobalVariable.js");
const PREFIX=GV.PREFIX;
const PREFIX_REACTION_MF="@#$4578$#@"; // 중지 이모지 반응용(중지 날린 곳에 지문 남긴 것)

const BOT_ID="751733763838443530";
const MORMOTTE_ID="751773063766343721";
const OWNER_ID="554178159717777420";

const LoginBotToken=process.env.BOT_TOKEN;
const LoginBotID=BOT_ID;

var msgMiddleFinger=0; // 중지 이모지 반응용 변수
var nagaStance=0; // 나가라고 전에 삼고초려 변수
>>>>>>> 0dd88ae8 (볼륨 이모지 작동 오류 버그 수정):src/bot.js
>>>>>>> cf085648 (볼륨 이모지 작동 오류 버그 수정)

<<<<<<< HEAD
const PREFIX="ㅣ";
=======
const GV = require("./../GlobalVariable.js");
const PREFIX=GV.PREFIX;
>>>>>>> d1b3cbb3 (펀치킹 알림기능 완성!)
const PREFIX_REACTION_MF="@#$4578$#@"; // 중지 이모지 반응용(중지 날린 곳에 지문 남긴 것)

const BOT_ID="751733763838443530";
const MORMOTTE_ID="751773063766343721";
const OWNER_ID="554178159717777420";

const LoginBotToken=process.env.BOT_TOKEN;
const LoginBotID=BOT_ID;
=======
const GV=require("./../GlobalVariable.js");
>>>>>>> a679a11f (셔플 기능 강화 & 루프 기능 추가)

var msgMiddleFinger=0; // 중지 이모지 반응용 변수
var nagaStance=0; // 나가라고 전에 삼고초려 변수
=======
const GV=require("./../GlobalVariable");
>>>>>>> a614095d (소스 모듈화 작업 중)

<<<<<<< HEAD
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
=======
var msgResponse = new Map();//music searching 같은 명령어에 대한 변수 관리
<<<<<<< HEAD
>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리))
=======
const func=require("./func");//잡다한 함수 모음
>>>>>>> a614095d (소스 모듈화 작업 중)

bot.on('ready', async () => {//정상적으로 작동하는지 출력하는 코드
    console.log(`${bot.user.tag}님이 로그인했습니다.`);
    console.log(moment().format("YYYY년 MM월 DD일 HH시 mm분 ss초"));
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    bot.user.setActivity('성적표에 F만 피', { type: 'PLAYING' });
    //프로그램 고칠 땐 문구를 "결국 전공 수업에서 F를 피하지 못하"로 바꿔두기
=======
    bot.user.setActivity('성적에서 F만 피', { type: 'PLAYING' });
<<<<<<< HEAD
<<<<<<< HEAD
=======
    bot.user.setActivity('개발 당', { type: 'PLAYING' });
>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리))
=======
    bot.user.setActivity('성적에서 F만 피', { type: 'PLAYING' });
>>>>>>> 0125156f (상태메시지 수정을 안했었네 ㅋㅋㅋㅋ)
    //프로그램 고칠 땐 문구를 "성적에서 F만 피"로 바꿔두기
    //개발할 땐 문구를 "개발"로 바꿔두기
>>>>>>> 8c0086a3 (음악봇 제작 시작)
=======
>>>>>>> 66a72334 (권한 확인 코드 재정비)
});

const func=require("./func.js");

//기본길드 전용 알람(현재는 그럼)
setInterval( () => {
    if(moment().minute()==25){//매 시간 25분마다 알람
        //펀치킹 알람
        let ampm;
        if(moment().hour()<12){
            if(moment().hour()==0){ampm="밤12";}
            else if(moment().hour()<6){ampm=`새벽${moment().hour()}`;}
            else if(moment().hour()<10){ampm=`아침${moment().hour()}`;}
            else{ampm=`오전${moment().hour()}`;}
        } else {
            if(moment().hour()==12){ampm="낮12";}
            else if(moment().hour()<18){ampm=`오후${moment().hour()-12}`;}
            else if(moment().hour()<22){ampm=`저녁${moment().hour()-12}`;}
            else{ampm=`밤${moment().hour()-12}`;}
        }
        const reminderMessage=`${moment().hour()}시(${ampm}시) 플래그하러 가세요~`;
        bot.guilds.cache.forEach( (guild)=>{
            if(guild.name!="💛 기본 💛") return; //기본길드 전용 코드
            const guildReminder=guild.channels.cache.find( (channel)=>{
                if(channel.name.startsWith('잡담'))
                    return channel; //소야봇-공지
            });
            try{
                guildReminder.send(reminderMessage)
                .then( msg => msg.delete({timeout: 10*60*1000}));
            } catch {  
                guild.systemChannel.send(reminderMessage)
                .then( msg => msg.delete({timeout: 10*60*1000}));
            }
        })
    }
<<<<<<< HEAD
}, 60*1000); // every 20 minutes
>>>>>>> d1b3cbb3 (펀치킹 알림기능 완성!)
=======
}, 60*1000); // every minutes
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 8c0086a3 (음악봇 제작 시작)
=======
*/
>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리))
=======

>>>>>>> 3068f905 (기본길드 전용 플래그 알림 걸어둠)

>>>>>>> 52f94846 (command 파일을 json으로 변경함)
=======

    exports.bot=bot;
    //테스트
});

//이모지 달았을 때 반응
>>>>>>> a614095d (소스 모듈화 작업 중)
bot.on('messageReactionAdd', async (reaction, user) => {
    const asdf=msgResponse.get(user.id);
    if(asdf!=undefined){//특수 명령어가 있는 경우 ex) 타로
        if(asdf.cmd=="tarotCard"){
            const tarot=require("./Commands/basic/CmdTarot");

            asdf.msg.edit({embed: (await tarot.secondStep(reaction, user))});//세컨 스텝
            msgResponse.delete(user.id);
        }
    } else {//특수 명령어가 없는 경우 ex)노래 사운드 조절
        const msg=reaction.message;
<<<<<<< HEAD:src/oldBot1.js
        if(msg.author.id==GV.LoginBotID){//봇이 단 메시지의 이모지인지 확인
            if(user.id==GV.LoginBotID) return;//자기가 이모지 단 거에 대한 이벤트는 의미 없지
=======
        if(msg.author.id==LoginBotID){//봇이 단 메시지의 이모지인지 확인
            if(user.id==LoginBotID) return;//자기가 이모지 단 거에 대한 이벤트는 의미 없지
>>>>>>> 0dd88ae8 (볼륨 이모지 작동 오류 버그 수정):src/bot.js
            if(msg.content.startsWith("이번 선곡은~\n")){//노래 이모지
                const musicBot=require("./Commands/music/Music.js");
                const serverQueue=musicBot.musicQueue.get(msg.guild.id);
                const dispatcher=serverQueue.dispatcher;

                reaction.users.remove(user);//일단 이모지부터 지우고 시작하자~
                switch(reaction.emoji.name){
                    case "⏯":
                        if(dispatcher.paused){
                            dispatcher.resume();
                            msg.channel.send("노래를 다시 틀어 드릴게요 ㅎㅎ");
                        }
                        else {
                            dispatcher.pause();
                            msg.channel.send("노래를 일시정지해 드렸어요!");
                        }
                    break;

                    case "⏩":
                        musicBot.skip(msg);
                    break;

                    case "⏹":
                        musicBot.empty(msg);
                    break;

                    case "🔁":
                        musicBot.loop(msg);
                    break;

                    case "🔀":
                        musicBot.shuffle(msg);
                    break;

                    case "🔇": 
                        serverQueue.mute=!(serverQueue.mute);
                        if(serverQueue.mute){//뮤트 걸리고 나서
                            dispatcher.setVolume(0);
                            msg.channel.send(`음소거되었어요`)
<<<<<<< HEAD
                        } else {//뮤트 걸린 거 풀 때
<<<<<<< HEAD:src/oldBot1.js
                            dispatcher.setVolume(serverQueue.volume/100);
=======
                        } else {//뮤트 풀리고 나서
                            dispatcher.setVolume(serverQueue.volume/200);
>>>>>>> 2c0157ca (셔플 기능 강화 & 루프 기능 추가)
=======
                            dispatcher.setVolume(serverQueue.volume/200);
>>>>>>> b5c25080 (노래봇 버그 수정 & 임베드 문구 수정):src/bot.js
                            msg.channel.send(`원래 소리로 돌아갔어요, 현재 볼륨:${serverQueue.volume}%`)
                        }
                    break;

                    case "🔉":
                        serverQueue.volume=Math.max(serverQueue.volume-10, 0);
                        dispatcher.setVolume(serverQueue.volume/200);
                        msg.channel.send(`현재 볼륨:${serverQueue.volume}%`);
                    break;

                    case "🔊":
<<<<<<< HEAD:src/oldBot1.js
<<<<<<< HEAD
                        serverQueue.volume=Math.min(serverQueue.volume+10,100);
                        dispatcher.setVolume(serverQueue.volume/100);
=======
                        serverQueue.volume=Math.min(serverQueue.volume+10, 100);
                        dispatcher.setVolume(serverQueue.volume/200);
>>>>>>> 736cbc30 (사운드 버그  & 타로 문구 수정)
=======
                        serverQueue.volume=Math.min(serverQueue.volume+10, 50);
                        dispatcher.setVolume(serverQueue.volume/200);
>>>>>>> b5c25080 (노래봇 버그 수정 & 임베드 문구 수정):src/bot.js
                        msg.channel.send(`현재 볼륨:${serverQueue.volume}%`);
                    break;
                }
            }
        }
    }
});

// 명령어 모음
bot.on('message', async (msg) => {
    if(msg.author.bot){return;}
    if(msg.channel.type==="dm"){
        if(msg.author!=OWNER_ID){
            (await msg.channel.send("DM은 명령어 안통함 ㅅㄱ"));
        } else {
            if(msg.content.startsWith(GV.PREFIX)){//명령어 어두 감지
                const [CMD_NAME, ...args] = msg.content.trim().substring(GV.PREFIX.length).split("/");//문장 정리
                if(CMD_NAME!="공지") return;
                bot.guilds.cache.find((guild)=>{//길드 이름 찾기
                    if(guild.name==args[0]){
                        guild.channels.cache.find((channel)=>{//서버 이름 찾기
                            if(channel.name==args[1]){channel.send(args[2]);}//공지 메시지 보내기
                        })
                    }
                })
            }
        }
        return
    }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    msg.content.toLowerCase();
    if(msg.content.startsWith(PREFIX)){//명령어 어두 감지
        const [CMD_NAME, ...args] = msg.content//문장 정리
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
=======
    msg.content.toLowerCase();//대소문자 구분 없애게
=======
    //msg.content.toLowerCase(); 대소문자 구분 없애야 하나?
=======

>>>>>>> 66a72334 (권한 확인 코드 재정비)
    const CommandBasic="./Commands/basic/";
    const CommandMusic="./Commands/music/";
<<<<<<< HEAD
>>>>>>> d1b3cbb3 (펀치킹 알림기능 완성!)
=======

<<<<<<< HEAD
>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리))
    if(msg.content.startsWith(PREFIX)){//명령어 어두 감지
        const [CMD_NAME, ...args] = msg.content.trim().substring(PREFIX.length).split(/\s+/);//문장 정리
=======
    if(msg.content.startsWith(GV.PREFIX)){//명령어 어두 감지
        const [CMD_NAME, ...args] = msg.content.trim().substring(GV.PREFIX.length).split(/\s+/);//문장 정리
>>>>>>> a679a11f (셔플 기능 강화 & 루프 기능 추가)
        let cmdCheck=false;

        const Command_BASIC=require("./Commands/CmdBasic.json");
        let cmd = Object.keys(Command_BASIC).find( (property) => //Command.js 파일에서 모든 프로퍼티를 문자배열화 시킴
            Command_BASIC[property].find( element=>element==CMD_NAME )!=undefined// 그 프로퍼티 배열 안에서 CMD_NAME과 같은 문자열 찾기
        );
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 52f94846 (command 파일을 json으로 변경함)

<<<<<<< HEAD
        //코드 시작
<<<<<<< HEAD
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
=======
=======
=======
=======
        const permissions = msg.channel.permissionsFor(msg.client.user);
>>>>>>> 66a72334 (권한 확인 코드 재정비)
        
>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리))
        //코드 시작 CommandBasic
>>>>>>> 8c0086a3 (음악봇 제작 시작)
        switch(cmd){
            case "테스트":
                
            break;

            case "나가":
                require(CommandBasic+"CmdNaga.js")
                .CommandNaga(msg);
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> d1b3cbb3 (펀치킹 알림기능 완성!)
            break;
            
            case "시간":
<<<<<<< HEAD
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
=======
                require(CommandBasic+"CommandTime.js")
=======
                cmdCheck=true;
=======
>>>>>>> 83133679 (노래봇 리액트 기능 추가(소리 음향 조절 기능 등)/버그 개선/공지 기능 추가)
            break;
            
            case "시간":
                require(CommandBasic+"CmdTime.js")
>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리))
                .CommandTime(msg);
            break;

            case "날짜":
                require(CommandBasic+"CmdDate.js")
                .CommandDate(msg);
            break;

            case "민둘":
                msg.channel.send('민둘이는 바보');
            break;

            case "맨둘":
                msg.channel.send('맨둘이는 집나갔음');
            break;

            case "민둘맨둘":
                msg.channel.send('민머리 맨머리 민둘맨둘');
            break;
            
            case "야":
                require(CommandBasic+"CmdAngry.js")
                .CommandAngry(msg);
            break;

            case "도움말":
<<<<<<< HEAD
                const helpEmbed=require(CommandBasic+"CmdHelp.js").helpEmbed;
                msg.channel.send({embed : helpEmbed});
>>>>>>> d1b3cbb3 (펀치킹 알림기능 완성!)
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

<<<<<<< HEAD
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
=======
                msg.channel.send({embed : require(CommandBasic+"CmdHelp.js").helpEmbed});
>>>>>>> 2cca1b4a (노래도움말 문구 수정)
            break;

<<<<<<< HEAD
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
=======
=======
            case "개발":
                msg.channel.send({embed : require(CommandBasic+"CmdDev.js").devEmbed});
            break;

<<<<<<< HEAD
>>>>>>> 7a1f6f12 (앞으로 개발할 내용을 개발 일지 임베드로 보내는 기능 추가)
=======
            case "타로":
                //권한 확인
                if(!permissions.has("ADD_REACTIONS"))
                    return msg.channel.send(`권한이 없어서 사용할 수가 없어요.\n 현재 필요한 권한의 상태입니다.\n> 택스트채널 이모지권한: ${permissions.has("ADD_REACTIONS")}`);
                
                //진행중인 명령어 확인
                if(msgResponse.get(msg.member.id)!=undefined)
                    return msg.channel.send(`이미 진행 중인 다른 명령어가 있네요. 해당 명령을 먼저 수행해주세요\n> 실행중인 명령어 키워드: ${msgResponse.get(msg.member.id).cmd}`);
                
                const tarot=require(CommandBasic+"CmdTarot.js");
                msgResponse.set(msg.member.id, {guild: msg.guild.id, cmd: "tarotCard-Waiting",});//이모지 작업 중 명령어 방지 코드
                msgResponse.set(msg.member.id,
                    {
                        guild: msg.guild.id,    cmd: "tarotCard", 
                        msg: (await tarot.firstStep(msg))//이거 되기까지 시간 걸림;;
                    }
                );
            break;

            case"건의":
                bot.users.cache.get(OWNER_ID).send(`'${msg.guild.name}'길드의 '${msg.channel.name}'채널에서 '${msg.author.username}'님이 건의사항 보내주셨어요.\n> ${args.join(" ")}`);
            break;

<<<<<<< HEAD
>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리))
            case "한로원":
                msg.channel.send("로바~");
            break;

            case "로바":
                msg.channel.send("로원 바보라는 뜻~");
            break;
            
            case "레순튀":
                msg.channel.send("레또팅!!");
            break;

            case "네고마워요ㅕ":
                msg.channel.send("진짜 검토한다고요 ㅡㅡ");
            break;

=======
>>>>>>> a679a11f (셔플 기능 강화 & 루프 기능 추가)
            case "텍스트게임":
                if(msg.author!=OWNER_ID)//테스트 기능은 나만 쓸 수 있어~
                    return msg.channel.send("개발자 전용 명령어입니다. 죄송해요 ^^;;");

                if(!permissions.has(["ADD_REACTIONS","MANAGE_MESSAGES"]))
                    return msg.channel.send(`권한이 없어서 사용할 수가 없어요.\n 현재 필요한 권한의 상태입니다.\n> 택스트채널 이모지권한: ${permissions.has("ADD_REACTIONS")}\n> 택스트 편집 권한: ${permissions.has("MANAGE_MESSAGES")}`);
                
                const gameData=require(`./Commands/game/gameData.js`);
                const getData=gameData.getData(msg);

                if(msgResponse.get(msg.member.id)!=undefined){
                    if(msgResponse.get(msg.member.id).cmd=="textGame"){
                        if(args[0]=="끄기") { //끄기 명령어는 게임을 저장하고 끔
                            msgResponse.delete(msg.member.id);

                            if(getData==undefined){//선택창인 경우만 해당
                                return msg.channel.send("게임이 선택되지 않고 종료되었습니다. 다음에는 꼭 게임을 실행해서 재밌게 즐겨주세요 ㅎㅎ");
                            } //나머지의 경우 무조건 data가 있는 경우. 없으면 에러인데, 에러체크는 절대 안하쥬~? ㅋㅋㅋㅋ;;;.... ㅠㅠㅠ
                            //data가 있는데 끄기 명령어면 data를 저장하고 끄겠다는 얘기지.
                            const gleer=require(`./Commands/game/${getData.gameName}.js`);
                            const answerAPI=await gleer.getAPI(msg);
                            gameData.setData(msg.member.id, {
                                gameName: getData.gameName,
                                stage: answerAPI.stage
                            });
                            return msg.channel.send("해당 게임이 종료되었습니다. 아직은 저장되지 않습니다;;;");
                        }
                    }
                    return msg.channel.send(`이미 진행 중인 다른 명령어가 있네요. 해당 명령을 먼저 수행해주세요\n> 실행중인 명령어 키워드: ${msgResponse.get(msg.member.id).cmd}`);
                }
                
                if(getData==undefined){//정보가 없으면 새로 만들어야지
                    const embed = await msg.channel.send({embed: require("./Commands/game/gameList.js").gameList})
                    msgResponse.set(msg.member.id,//최초 게임 선택지
                        {
                            guild: msg.guild.id,    cmd: "textGame", 
                            gameName: undefined,
                            msg: embed,
                            reply: undefined,
                        }
                    );
                } else {//정보가 있으면 정보를 불러와야지
                    msg.channel.send("저장된 정보 확인");
                    const gleer=require(`./Commands/game/${getData.gameName}.js`);
                    const answerAPI= await gleer.createAPI(msg);   await gleer.refreshQuest(msg, getData.stage);
                    const embed = await msg.channel.send({embed : answerAPI.quest});

                    msgResponse.set(msg.member.id,//최초 게임 선택지
                        {
                            guild: msg.guild.id,    cmd: "textGame", 
                            gameName: getData.gameName,
                            msg: embed,
                            reply: undefined,
                        }
                    );
                }
            break;

            default:
<<<<<<< HEAD
                msg.channel.send("명령어로 사용될 수 있는지 검토해볼게요~");
                console.log(CMD_NAME);
>>>>>>> d1b3cbb3 (펀치킹 알림기능 완성!)
=======
                cmdCheck=true;
>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리))
            break;
            */
        }
        
        //코드 시작 CommandMusic
        const Command_MUSIC=require("./Commands/CmdMusic.json");
        cmd = Object.keys(Command_MUSIC).find( (property) => //Command.js 파일에서 모든 프로퍼티를 문자배열화 시킴
            Command_MUSIC[property].find( element=>element==CMD_NAME )!=undefined// 그 프로퍼티 배열 안에서 CMD_NAME과 같은 문자열 찾기
        );

        const musicBot=require(CommandMusic+"Music.js");
        if(cmdCheck){
            cmdCheck=false;
            switch(cmd){
                case "노래":
                    musicBot.execute(msg, args.join(" "));
                break;

                case "비우기":
                    musicBot.empty(msg);
                break;

                case "스킵":
                    musicBot.skip(msg);
                break;

                case "큐":
                    musicBot.show(msg);
                break;

                case "검색":
                    if(msgResponse.get(msg.member.id)!=undefined)
                        return msg.channel.send(`이미 진행 중인 다른 명령어가 있네요. 해당 명령을 먼저 수행해주세요\n> 실행중인 명령어 키워드: ${msgResponse.get(msg.member.id).cmd}`);

                    const embedTemp = await musicBot.searchYoutube(msg, args.join(" "));
                    const msgTemp = await msg.channel.send({embed: embedTemp});
                    msgResponse.set(msg.member.id,
                        {
                            guild: msg.guild.id, cmd: "musicSearch",
                            embed: embedTemp,
                            message: msgTemp
                        } //musicSearch는 embed, msg 저장
                    );
                break;

                case "셔플":
                    musicBot.shuffle(msg);
                break;

                case "루프":
                    musicBot.loop(msg);
                break;

                case "삭제":
                    if(msgResponse.get(msg.member.id)!=undefined)
                        return msg.channel.send(`이미 진행 중인 다른 명령어가 있네요. 해당 명령을 먼저 수행해주세요\n> 실행중인 명령어 키워드: ${msgResponse.get(msg.member.id).cmd}`);
                    
<<<<<<< HEAD:src/oldBot1.js
<<<<<<< HEAD
                    musicBot.remove(msg, args);
=======
>>>>>>> b5c25080 (노래봇 버그 수정 & 임베드 문구 수정):src/bot.js
                    let argsTemp=[];
                    args.forEach(element=>{//args의 각각의 성분을
                        element.split(",").forEach(elem=>{
                            if(elem!="")argsTemp.push(elem); //,단위로 쪼개어 하나하나 집어넣기
                        });
                    });
=======
                    const argsArr=await func.effectiveArr(args.toString(),",",1,8);//배열이 유효한지 조사
                    
                    if(argsArr.length==0){msg.channel.send("올바른 명령이 입력되지 않아 삭제 명령이 취소되었습니다.");}
                    else{musicBot.remove(msg, argsArr);}
>>>>>>> 94bc2140 (소스 모듈화 작업 중)

                    let argsCheck=[];//명령어가 유효한지 전수 조사
                    while(argsTemp.length>0) {
                        const tmpFunc = async ()=>{
                            let tmp=argsTemp.shift(); tmp++; tmp--; if(isNaN(tmp)) return;//숫자로 형변환이 되는지 확인
                            tmp=Math.floor(tmp); if(tmp<1 || tmp>8) return;//숫자라면, 정수로 만들어서 1~8 사이에 있는지 확인
                            argsCheck.push(tmp-1);
                        }
                        await tmpFunc();
                    }
                    const setCheck=new Set(argsCheck);//중복 제거
                    argsCheck=[...setCheck];

                    musicBot.remove(msg, argsCheck);

                    msgResponse.set(msg.member.id,//멤버를 기준으로
                        {
                            guild: msg.guild.id,    cmd: "musicRemove",
<<<<<<< HEAD:src/oldBot1.js
<<<<<<< HEAD
                            args: argsTemp,//이게 실제 명령어
=======
                            args: argsArr,//이게 실제 명령어
>>>>>>> 94bc2140 (소스 모듈화 작업 중)
=======
                            args: argsCheck,//이게 실제 명령어
>>>>>>> b5c25080 (노래봇 버그 수정 & 임베드 문구 수정):src/bot.js
                            timer: setTimeout(()=>{
                                msg.channel.send("대답이 따로 없으니까 그냥 내비둘게요~");
                                msgResponse.delete(msg.member.id);
                            },7*1000)//setTimeout 켜고 끄게 하려고
                        }   //musicRemove는 args 저장
                    );
                break;

                case "노래도움말":
                    msg.channel.send({embed : require(CommandMusic+"CmdMusicHelp.js").helpEmbed});
                break;

                default:
                    msg.channel.send("명령어를 인식하지 못했어요 ㅠㅠ 명령어를 다시 한 번 확인해주세요!");
                    console.log(CMD_NAME);
                    cmdCheck=true;
                break;
            }
        }
    
    } else {//명령어 어두 비감지
        if(msgResponse.size>0){
            //다른 명령어에 대한 response를 주었을 때
            //그에 해당하는 입력값을 알맞게 변형해주는 부분
            //ex)music search할 때 번호 불러주는 걸 재입력(피드백)받음
            const cmdResponse=msgResponse.get(msg.member.id);
            const musicBot=require(CommandMusic+"Music.js");

            if(cmdResponse!=undefined){//있어야 작동함
                switch(cmdResponse.cmd){
                    case 'musicSearch':
                        const msgArr=await func.effectiveArr(msg.content,",",1,8);//배열이 유효한지 조사

<<<<<<< HEAD
                        let arrCheck=[];//명령어가 유효한지 전수 조사

                        while(arrTemp.length>0) {
                            const tmpFunc = async ()=>{
                                let tmp=arrTemp.shift(); tmp++; tmp--; if(isNaN(tmp)) return;//숫자로 형변환이 되는지 확인
                                tmp=Math.floor(tmp); if(tmp<1 || tmp>8) return;//숫자라면, 정수로 만들어서 1~8 사이에 있는지 확인
                                arrCheck.push(tmp-1);
                            }
                            await tmpFunc();
                        }

                        if(arrCheck.length==0) {//리스트에 추가할 게 없을 때(즉, 검색이 유효하지 않으면 바로 취소함)
=======
                        if(msgArr.length==0) {//리스트에 추가할 게 없을 때(즉, 검색이 유효하지 않으면 바로 취소함)
>>>>>>> 94bc2140 (소스 모듈화 작업 중)
                            cmdResponse.message.delete();
                            msgResponse.delete(msg.member.id);
                            return msg.channel.send("유효하지 않은 대답이에요. 노래 검색 취소할게요..;;");
                        }

                        while(msgArr.length>0){
                            await musicBot.execute(msg, cmdResponse.embed.fields[msgArr.shift()].url);
                        }

                        msg.delete();
                        cmdResponse.message.delete();
                        
                        msgResponse.delete(msg.member.id);
                    break;

                    case 'musicRemove':
                        const correctArr=["네","어","ㅇㅋ","ㅇㅇ","y","Y","알았어","dz","dd", "얍"];
                        if(correctArr.includes(msg.content)){//긍정
                            clearTimeout(cmdResponse.timer);
                            cmdResponse.args.sort((a,b)=>{return b-a;})
                            .forEach(element => {
                                if(element==0){musicBot.skip(msg);}
                                else{musicBot.musicQueue.get(msg.guild.id).songs.splice(element,1);}
                            });
                            await msg.channel.send("삭제 완료!");
                            if(musicBot.musicQueue.get(msg.guild.id).songs.length>0)
                                musicBot.show(msg);//큐에 남아있는 노래가 있다면 보여주기
                        } else {//부정
                            msg.channel.send("부정의 의미로 받아들이고, 그대로 내버려둘게요.");
                        }
                        msgResponse.delete(msg.member.id);
                    break;

                    case "textGame":
                        if(cmdResponse.gameName==undefined){ //최초 게임 선택창
                            var str=null;
                            const gameTitleArr=require("./Commands/game/gameList.js").gameList.fields;

                            for(i of gameTitleArr){//fields에 있는 게임 이름 전수 조사
                                if(msg.content==i.name.slice(i.name.indexOf(".")+2) || msg.content==i.name.split(". ")[0]) str=i.name.slice(i.name.indexOf(".")+2);
                            }

                            if(str==null) // 게임 선택 안됐다
                                return msg.channel.send("게임 이름을 다시 제대로 입력해주세요!(단순히 해당 게임에 대한 숫자 입력으로도 가능해요!)");
                            
                            cmdResponse.gameName=str;

                            const gleer=require(`./Commands/game/${cmdResponse.gameName}.js`);
                            const answerAPI=gleer.createAPI(msg);
                            await gleer.refreshQuest(msg, answerAPI.stage);

                            const gameData=require(`./Commands/game/gameData.js`);
                            gameData.setData(msg.member.id, {gameName: cmdResponse.gameName, stage: answerAPI.stage});

                            await cmdResponse.msg.delete();
                            cmdResponse.msg = await msg.channel.send({embed : answerAPI.quest});
                            msg.delete();
                        } else {//해당 게임에 대한 feedback 구역
                            const gleer=require(`./Commands/game/${cmdResponse.gameName}.js`);
                            const answerAPI=gleer.getAPI(msg);
                            let script=`현재 게임 : ${cmdResponse.gameName}, stage : ${answerAPI.quest.fields[0].name}\n 메시지 ${msg.content} 에 대한 응답입니다.\n> `;

                            if(msg.content===answerAPI.answer){
                                script+="정답입니다!";
                                cmdResponse.msg.delete();

                                await gleer.refreshQuest(msg, ++answerAPI.stage);

                                if(answerAPI.answer==undefined){
                                    msgResponse.delete(msg.member.id);
                                    cmdResponse.reply = await msg.reply(script);
                                    return msg.channel.send("축하드립니다, 모든 정답을 맞추셨습니다.");
                                }
                                const gameData=require(`./Commands/game/gameData.js`);
                                gameData.setData(msg.member.id, {gameName: cmdResponse.gameName, stage: answerAPI.stage-1});

                                cmdResponse.reply = await msg.reply(script);
                                cmdResponse.msg = await msg.channel.send({embed : answerAPI.quest});
                            } else {
                                script+="틀렸어요;;";cmdResponse.reply = await msg.reply(script);
                                /*
                                let reeee=cmdResponse.reply;
                                cmdResponse.reply = await msg.reply(script);
                                if(reeee!=undefined) await reeee.delete();
                                await msg.delete();*/
                            }
                            
                            
                        }
                    break;

                    default:
                        console.log(`${msgResponse.cmd}가 작동 안돼는 중`);
                    break;
                }
                return;
            }
        }
        
        const CMD_Array= msg.content.trim().split(/\s+/); // 정규 표현식 공부하기
        const psudoCommand_BASIC=require(CommandBasic+"/PsudoCommand.json");
        const cmd = Object.keys(psudoCommand_BASIC).find( (property) => //Command.js 파일에서 모든 프로퍼티를 문자배열화 시킴
            psudoCommand_BASIC[property].find(element=>CMD_Array.includes(element))!=undefined// 그 프로퍼티 배열 안에서 CMD_Array에 있는 인자와 같은 문자열 찾기
        );

        //코드 시작
        switch(cmd){
            case "아님":
                msg.channel.send('맞는데?');
            break;
  
            case "거짓말":
                msg.channel.send("그걸 믿냐 ㅋㅋㅋㅋ");
            break;

            default:
                cmdCheck=true;
            break;
        }
    }
});

<<<<<<< HEAD
<<<<<<< HEAD
bot.on('guildMemberAdd',async (member) => {
    console.log(`${member.user.tag}: 접속`);
});

<<<<<<< HEAD:src/oldBot1.js
<<<<<<< HEAD:src/oldBot1.js
<<<<<<< HEAD:src/oldBot1.js
<<<<<<< HEAD:src/oldBot1.js
<<<<<<< HEAD
<<<<<<< HEAD
bot.login(process.env.MORMOTTE_TOKEN);
=======
bot.login(LoginBotToken);
>>>>>>> a11f89bf (볼륨 이모지 작동 오류 버그 수정)
=======
bot.login(GV.LoginBotToken);
>>>>>>> 2c0157ca (셔플 기능 강화 & 루프 기능 추가)
=======
bot.login(GV.LoginBotToken);
>>>>>>> 94bc2140 (소스 모듈화 작업 중)
=======
//bot.login(GV.LoginBotToken);
>>>>>>> 40105dd3 (민둘봇 switch구문 지우고 완전 새로 코딩함(music기능은 꺼둠))
=======
bot.login(process.env.BOT_TOKEN);
>>>>>>> 4d039ce8 (민둘봇 토큰 실수;;):src/bot.js
=======
bot.login(process.env.MORMOTTE_TOKEN);
>>>>>>> c90f7f09 (.env 없이도 돌아가나 테스트):src/bot.js
=======
bot.login(process.env.BOT_TOKEN);
>>>>>>> b5c25080 (노래봇 버그 수정 & 임베드 문구 수정):src/bot.js
=======
bot.login(LoginBotToken);
>>>>>>> 0dd88ae8 (볼륨 이모지 작동 오류 버그 수정):src/bot.js
