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

const bot = new Client();

<<<<<<< HEAD
const PREFIX="ㅣ";
=======
const GV = require("./../GlobalVariable.js");
const PREFIX=GV.PREFIX;
>>>>>>> d1b3cbb3 (펀치킹 알림기능 완성!)
const PREFIX_REACTION_MF="@#$4578$#@"; // 중지 이모지 반응용(중지 날린 곳에 지문 남긴 것)

const MORMOTTE_ID="751773063766343721";
const OWNER_ID="554178159717777420";

var msgMiddleFinger=0; // 중지 이모지 반응용 변수
var nagaStance=0; // 나가라고 전에 삼고초려 변수

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
>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리))

bot.on('ready', async () => {
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
=======
    bot.user.setActivity('개발 당', { type: 'PLAYING' });
>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리))
=======
    bot.user.setActivity('성적에서 F만 피', { type: 'PLAYING' });
>>>>>>> 0125156f (상태메시지 수정을 안했었네 ㅋㅋㅋㅋ)
    //프로그램 고칠 땐 문구를 "성적에서 F만 피"로 바꿔두기
    //개발할 땐 문구를 "개발"로 바꿔두기
>>>>>>> 8c0086a3 (음악봇 제작 시작)
});

function equalTime(h, m) {
    return (moment().hour()==h && moment().minute()==m);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

var http = require("http");//heroku 지속 갱신

setInterval( () => {
    http.get("http://mindulbot.herokuapp.com");
}, 20*60*1000); // every 20 minutes

setInterval(()=>{
    if(moment().hour()==0)
        shuffle(require("./Commands/basic/CmdTarot.js").script);
},60*60*1000);//1시간

/*
setInterval( () => {
    if(equalTime(23, 0), equalTime(21, 0)){
        //펀치킹 알람
        const reminderMessage="펀치킹치러 가세요~";
        bot.guilds.cache.forEach( (guild)=>{
            //if(guild.name!="민둘이의 실험방") return; //개발용 코드
            const guildReminder=guild.channels.cache.find( (channel)=>{
                if(channel.name.startsWith('소야봇'))
                    return channel; //소야봇-공지
                else if(channel.name.startsWith('민둘봇'))
                    return channel; //민둘봇-공지 
            });
            try{
                guildReminder.send(reminderMessage)
                //.then( msg => msg.delete({timeout: 50*1000}));
            } catch {  
                guild.systemChannel.send(reminderMessage)
                //.then( msg => msg.delete({timeout: 50*1000}));
            }
        })
    }
<<<<<<< HEAD
}, 60*1000); // every 20 minutes
>>>>>>> d1b3cbb3 (펀치킹 알림기능 완성!)
=======
}, 60*1000); // every minutes
<<<<<<< HEAD
>>>>>>> 8c0086a3 (음악봇 제작 시작)
=======
*/
>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리))

>>>>>>> 52f94846 (command 파일을 json으로 변경함)
bot.on('messageReactionAdd', async (reaction, user) => {
    const asdf=msgResponse.get(user.id);
    if(asdf!=undefined){//특수 명령어가 있는 경우 ex) 타로
        let strDes="", strField="";
        if(asdf.cmd=="tarotCard"){
            const tarot=require("./Commands/basic/CmdTarot.js");
            const arr=tarot.script;
            
            reaction.users.remove(user);
            switch(reaction.emoji.name){
                case "❤️": strDes="빨간색 하트를 고른 당신!"; strField=arr[0]; break;
                case "🧡": strDes="주황색 하트를 고른 당신!"; strField=arr[1]; break;
                case "💛": strDes="노란색 하트를 고른 당신!"; strField=arr[2]; break;
                case "💚": strDes="초록색 하트를 고른 당신!"; strField=arr[3]; break;
                case "💙": strDes="파란색 하트를 고른 당신!"; strField=arr[4]; break;
                case "💜": strDes="보라색 하트를 고른 당신!"; strField=arr[5]; break;
            }

            const tarotEmbed = {
                color: 0xF7CAC9,
                author: {
                    name: '민둘봇의 타로 하트',
                    icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
                },
                description: `${strDes}`,
                fields:[{name: `오늘은 **${strField[0]}**이에요`, value: strField[2]}],
                image: {url: strField[1]},
                footer: {
                    text: `모든 설명은 심리학 이론인 바넘효과를 바탕으로 작성되었습니다.`,
                    icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
                },
            };
            asdf.msg.edit({embed: tarotEmbed});
            msgResponse.delete(user.id);
        }
    } else {//특수 명령어가 없는 경우 ex)노래 사운드 조절
        const msg=reaction.message;
        if(msg.author.id==MORMOTTE_ID){//봇이 단 메시지의 이모지인지 확인
            if(user.id==MORMOTTE_ID) return;//자기가 이모지 단 거에 대한 이벤트는 의미 없지
            if(msg.content.startsWith("이번 선곡은~\n")){//노래 이모지
                const musicBot=require("./Commands/music/Music.js");
                const serverQueue=musicBot.musicQueue.get(msg.guild.id);
                const dispatcher=serverQueue.dispatcher;

                reaction.users.remove(user);//일단 이모지부터 지우고 시작하자~
                switch(reaction.emoji.name){
                    case "⏯":
                        if(dispatcher.paused) dispatcher.resume();
                        else dispatcher.pause();
                    break;

                    case "⏩":
                        musicBot.skip(msg);
                    break;

                    case "⏹":
                        musicBot.stop(msg);
                    break;

                    case "🔇": 
                        if(!serverQueue.mute){//뮤트 걸어야 할 때
                            dispatcher.setVolume(0);
                            msg.channel.send(`음소거되었어요`)
                        } else {//뮤트 걸린 거 풀 때
                            dispatcher.setVolume(serverQueue.volume/100);
                            msg.channel.send(`원래 소리로 돌아갔어요, 현재 볼륨:${serverQueue.volume}%`)
                        }
                        serverQueue.mute=!(serverQueue.mute);
                    break;

                    case "🔉":
                        serverQueue.volume=Math.max(serverQueue.volume-10,0);
                        dispatcher.setVolume(serverQueue.volume/100);
                        msg.channel.send(`현재 볼륨:${serverQueue.volume}%`);
                    break;

                    case "🔊":
                        serverQueue.volume=Math.min(serverQueue.volume+10,100);
                        dispatcher.setVolume(serverQueue.volume/100);
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
            if(msg.content.startsWith(PREFIX)){//명령어 어두 감지
                const [CMD_NAME, ...args] = msg.content.trim().substring(PREFIX.length).split("/");//문장 정리
                if(CMD_NAME!="공지") return;
                bot.guilds.cache.find((guild)=>{
                    if(guild.name==args[0]){
                        guild.channels.cache.find((channel)=>{
                            if(channel.name==args[1]){
                                channel.send(args[2]);
                            }
                        })
                    }
                })
            }
        }
        return
    }
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
    const CommandBasic="./Commands/basic/";
    const CommandMusic="./Commands/music/";
<<<<<<< HEAD
>>>>>>> d1b3cbb3 (펀치킹 알림기능 완성!)
=======

>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리))
    if(msg.content.startsWith(PREFIX)){//명령어 어두 감지
        const [CMD_NAME, ...args] = msg.content.trim().substring(PREFIX.length).split(/\s+/);//문장 정리
        let cmdCheck=false;

        const Command_BASIC=require("./Commands/CmdBasic.json");
        let cmd = Object.keys(Command_BASIC).find( (property) => //Command.js 파일에서 모든 프로퍼티를 문자배열화 시킴
            Command_BASIC[property].find( element=>element==CMD_NAME )!=undefined// 그 프로퍼티 배열 안에서 CMD_NAME과 같은 문자열 찾기
        );
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
        
>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리))
        //코드 시작 CommandBasic
>>>>>>> 8c0086a3 (음악봇 제작 시작)
        switch(cmd){
            case "테스트":
                if(msg.author.id!=OWNER_ID) return;// 내꺼 한정임 ㅅㄱ

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

            case "얍":
                msg.reply("얍");
            break;

            case "ping":
                msg.reply('Pong!');
            break;

            case "gnip":
                msg.reply('!gnoP');
            break;

            case "민둘":
                msg.channel.send('민둘이는 바보');
            break;

            case "맨둘":
                msg.channel.send('맨둘이는 집나갔음');
            break;
            
            case "야":
                require(CommandBasic+"CmdAngry.js")
                .CommandAngry(msg);
            break;

            case "도움말":
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
                const devEmbed=require(CommandBasic+"CmdDev.js").devEmbed;
                msg.channel.send({embed : devEmbed});
            break;

<<<<<<< HEAD
>>>>>>> 7a1f6f12 (앞으로 개발할 내용을 개발 일지 임베드로 보내는 기능 추가)
=======
            case "타로":
                if(msgResponse.get(msg.member.id)!=undefined)
                    return msg.channel.send("다른 곳에서 타로하트 기능을 이미 쓰고 있어요.");;
               
                const tarot=require(CommandBasic+"CmdTarot.js");
                msgResponse.set(msg.member.id, {guild: msg.guild.id, cmd: "tarotCard-Waiting",});//이모지 작업 중 명령어 방지 코드
                msgResponse.set(msg.member.id,
                    {
                        guild: msg.guild.id,    cmd: "tarotCard", 
                        msg: (await tarot.firstStep(msg))
                    }
                );
            break;

            case"건의":
                bot.users.cache.get(OWNER_ID).send(`'${msg.guild.name}'길드의 '${msg.channel.name}'채널에서 '${msg.author.username}'님이 건의사항 보내주셨어요.\n> ${args.join(" ")}`);
            break;

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

                case "멈춤":
                    musicBot.stop(msg);
                break;

                case "스킵":
                    musicBot.skip(msg);
                break;

                case "큐":
                    musicBot.show(msg);
                break;

                case "검색":
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

                case "삭제":
                    musicBot.remove(msg, args);
                    let argsTemp=[];
                    args.forEach(element=>{//args의 각각의 성분을
                        element.split(",").forEach(elem=>{
                            if(elem!="")argsTemp.push(elem); //,단위로 쪼개어 하나하나 집어넣기
                        });
                    });

                    msgResponse.set(msg.member.id,//멤버를 기준으로
                        {
                            guild: msg.guild.id,    cmd: "musicRemove",
                            args: argsTemp,//이게 실제 명령어
                            timer: setTimeout(()=>{
                                msg.channel.send("대답이 따로 없으니까 그냥 내비둘게요~");
                                msgResponse.delete(msg.member.id);
                            },7*1000)//setTimeout 켜고 끄게 하려고
                        }   //musicRemove는 args 저장
                    );
                break;

                case "노래도움말":
                    const helpEmbed=require(CommandMusic+"CmdMusicHelp.js").helpEmbed;
                    msg.channel.send({embed : helpEmbed});
                break;

                default:
                    msg.channel.send("명령어로 사용될 수 있는지 검토해볼게요~");
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
                        let arrTemp=[];//일단 명령어 담아두기
                        msg.content.split(",").forEach(element => {
                            if(element!="") arrTemp.push(element.trim());
                        });

                        let arrCheck=[];//명령어가 유효한지 전수 조사

                        while(arrTemp.length>0) {
                            const tmpFunc = async ()=>{
                                let tmp=arrTemp.shift(); tmp++; tmp--; if(isNaN(tmp)) return;//숫자로 형변환이 되는지 확인
                                tmp=Math.floor(tmp); if(tmp<1 || tmp>10) return;//숫자라면, 정수로 만들어서 1~10 사이에 있는지 확인
                                arrCheck.push(tmp-1);
                            }
                            await tmpFunc();
                        }
                        if(arrCheck.length==0) {//리스트에 추가할 게 없을 때(즉, 검색이 유효하지 않으면 바로 취소함)
                            cmdResponse.message.delete();
                            msgResponse.delete(msg.member.id);
                            return msg.channel.send("노래 검색 취소할게요;;");
                        }

                        while(arrCheck.length>0){
                            await musicBot.execute(msg, cmdResponse.embed.fields[arrCheck.shift()].url);
                        }

                        msg.delete();
                        cmdResponse.message.delete();
                        
                        msgResponse.delete(msg.member.id);
                    break;

                    case 'musicRemove':
                        const correctArr=["네","어","ㅇㅋ","ㅇㅇ","y","Y"];
                        if(correctArr.includes(msg.content)){//긍정
                            cmdResponse.args.forEach(element => {
                                if(element.charAt()-1==0){musicBot.skip(msg); console.log("얍");}
                                else{musicBot.musicQueue.get(msg.guild.id).songs.splice(element.charAt()-1,1);}
                            });
                            clearTimeout(msgResponse.timer);
                            await msg.channel.send("삭제 완료!");
                            musicBot.show(msg);
                        } else {//부정
                            msg.channel.send("부정의 의미로 받아들이고, 그대로 내버려둘게요.");
                        }
                        msgResponse.delete(msg.member.id);
                    break;

                    case 'tarotCard':
                    break;

                    default:
                        console.log(`${msgResponse.cmd}가 작동 안돼는 중`);
                    break;
                }
                return;
            }
        }

        let cmdCheck=false;

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

            case "한로원":
                msg.channel.send("로천~");
            break;

            case "로바":
                msg.channel.send("알고보니 천재라던데");
            break;
            
            case "레순튀":
                msg.channel.send("레또팅!!");
            break;

            default:
                cmdCheck=true;
            break;
        }
    }
});

bot.on('guildMemberAdd',async (member) => {
    console.log(`${member.user.tag}: 접속`);
});

bot.login(process.env.MORMOTTE_TOKEN);