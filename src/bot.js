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
});

const func=require("./func.js");

var http = require("http");//heroku 지속 갱신
setInterval( () => {
    http.get("http://mindulbot.herokuapp.com");
}, 10*60*1000); // every 20 minutes

//타로 카드 셔플
setImmediate(()=>{
    func.shuffle(require("./Commands/basic/CmdTarot.js").script);
    setInterval(()=>{
        if(moment().hour()==0)
            func.shuffle(require("./Commands/basic/CmdTarot.js").script);
    },60*60*1000)//1시간
});

//기본길드 전용 알람(현재는 그럼)
setInterval( () => {
    if(
        func.equalTime(00,25) || func.equalTime(02,25) || func.equalTime(04,25) || func.equalTime(06,25) || func.equalTime(08,25) ||
        func.equalTime(10,25) || func.equalTime(12,25) || func.equalTime(14,25) || func.equalTime(16,25) || func.equalTime(18,25) ||
        func.equalTime(20,25) || func.equalTime(22,25)
    ){
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
}, 60*1000); // every minutes


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

    const CommandBasic="./Commands/basic/";
    const CommandMusic="./Commands/music/";

    if(msg.content.startsWith(PREFIX)){//명령어 어두 감지
        const [CMD_NAME, ...args] = msg.content.trim().substring(PREFIX.length).split(/\s+/);//문장 정리
        let cmdCheck=false;

        const Command_BASIC=require("./Commands/CmdBasic.json");
        let cmd = Object.keys(Command_BASIC).find( (property) => //Command.js 파일에서 모든 프로퍼티를 문자배열화 시킴
            Command_BASIC[property].find( element=>element==CMD_NAME )!=undefined// 그 프로퍼티 배열 안에서 CMD_NAME과 같은 문자열 찾기
        );
        const permissions = msg.channel.permissionsFor(msg.client.user);
        
        //코드 시작 CommandBasic
        switch(cmd){
            case "테스트":
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

            case "나가":
                require(CommandBasic+"CmdNaga.js")
                .CommandNaga(msg);
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
                if(!permissions.has("ADD_REACTIONS"))
                    return msg.channel.send(`권한이 없어서 사용할 수가 없어요.\n 현재 필요한 권한의 상태입니다.\n> 택스트채널 이모지권한: ${permissions.has("ADD_REACTIONS")}`);
                
                if(msgResponse.get(msg.member.id)!=undefined)
                    return msg.channel.send(`이미 진행 중인 다른 명령어가 있네요. 해당 명령을 먼저 수행해주세요\n> 실행중인 명령어 키워드: ${msgResponse.get(msg.member.id).cmd}`);
                
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

                case "삭제":
                    if(msgResponse.get(msg.member.id)!=undefined)
                        return msg.channel.send(`이미 진행 중인 다른 명령어가 있네요. 해당 명령을 먼저 수행해주세요\n> 실행중인 명령어 키워드: ${msgResponse.get(msg.member.id).cmd}`);
                    
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
                        const correctArr=["네","어","ㅇㅋ","ㅇㅇ","y","Y","알았어","dz","dd", "얍"];
                        if(correctArr.includes(msg.content)){//긍정
                            cmdResponse.args.forEach(element => {
                                if(element.charAt()-1==0){musicBot.skip(msg);}
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
                msg.channel.send("로바~");
            break;

            case "로바":
                msg.channel.send("ㅇㅈ");
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