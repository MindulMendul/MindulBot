require('dotenv').config();

const {Client} = require('discord.js');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul"); //서울 시간

const bot = new Client();

const GV = require("./../GlobalVariable.js");
const PREFIX=GV.PREFIX;
const PREFIX_REACTION_MF="@#$4578$#@"; // 중지 이모지 반응용(중지 날린 곳에 지문 남긴 것)

const MORMOTTE_ID="751773063766343721";
const OWNER_ID="554178159717777420";

var msgMiddleFinger=0; // 중지 이모지 반응용 변수
var nagaStance=0; // 나가라고 전에 삼고초려 변수

var msgResponse = new Map();//music searching 같은 명령어에 대한 변수 관리

bot.on('ready', async () => {
    console.log(`${bot.user.tag}님이 로그인했습니다.`);
    console.log(moment().format("YYYY년 MM월 DD일 HH시 mm분 ss초"));
    bot.user.setActivity('성적에서 F만 피', { type: 'PLAYING' });
    //프로그램 고칠 땐 문구를 "성적에서 F만 피"로 바꿔두기
    //개발할 땐 문구를 "개발"로 바꿔두기
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
const { count } = require('console');

//setInterval( () => {
    //http.get("http://mindulbot.herokuapp.com");
//}, 20*60*1000); // every 20 minutes

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
}, 60*1000); // every minutes
*/

bot.on('messageReactionAdd', async (reaction, user) => {
    const asdf=msgResponse.get(user.id);
    if(asdf==undefined) return;

    let strDes="", strField="";
    if(asdf.cmd=="tarotCard"){
        const tarot=require("./Commands/basic/CmdTarot.js");
        const arr=tarot.script;

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
});

// 명령어 모음
bot.on('message', async (msg) => {
    if(msg.author.bot){return;}
    if(msg.channel.type==="dm"){
        if(msg.author!=bot.user){
            (await msg.channel.send("DM은 명령어 안통함 ㅅㄱ"));
        } return;
    }
    //msg.content.toLowerCase(); 대소문자 구분 없애야 하나?
    const CommandBasic="./Commands/basic/";
    const CommandMusic="./Commands/music/";

    if(msg.content.startsWith(PREFIX)){//명령어 어두 감지
        const [CMD_NAME, ...args] = msg.content.trim().substring(PREFIX.length).split(/\s+/);//문장 정리
        let cmdCheck=false;

        const Command_BASIC=require("./Commands/CmdBasic.json");
        let cmd = Object.keys(Command_BASIC).find( (property) => //Command.js 파일에서 모든 프로퍼티를 문자배열화 시킴
            Command_BASIC[property].find( element=>element==CMD_NAME )!=undefined// 그 프로퍼티 배열 안에서 CMD_NAME과 같은 문자열 찾기
        );
        
        //코드 시작 CommandBasic
        switch(cmd){
            case "테스트":
                if(msg.author.id!=OWNER_ID) return;// 내꺼 한정임 ㅅㄱ

            break;

            case "나가":
                require(CommandBasic+"CmdNaga.js")
                .CommandNaga(msg);
                cmdCheck=true;
            break;
            
            case "시간":
                require(CommandBasic+"CmdTime.js")
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
            break;

            case "개발":
                const devEmbed=require(CommandBasic+"CmdDev.js").devEmbed;
                msg.channel.send({embed : devEmbed});
            break;

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
                cmdCheck=true;
            break;
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

bot.login(process.env.BOT_TOKEN);