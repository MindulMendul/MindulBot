require('dotenv').config();

const {Client} = require('discord.js');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul"); //서울 시간
require('./botAlarm');

const bot = new Client();
const GV=require("../GlobalVariable");

var msgResponse = new Map();//music searching 같은 명령어에 대한 변수 관리
const func=require("./func");//잡다한 함수 모음

bot.on('ready', async () => {//정상적으로 작동하는지 출력하는 코드
    console.log(`${bot.user.tag}님이 로그인했습니다.`);
    console.log(moment().format("YYYY년 MM월 DD일 HH시 mm분 ss초"));
    bot.user.setActivity('성적에서 F만 피', { type: 'PLAYING' });

    exports.bot=bot;
    //테스트
});

//이모지 달았을 때 반응
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
        if(msg.author.id==GV.LoginBotID){//봇이 단 메시지의 이모지인지 확인
            if(user.id==GV.LoginBotID) return;//자기가 이모지 단 거에 대한 이벤트는 의미 없지
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
                        } else {//뮤트 풀리고 나서
                            dispatcher.setVolume(serverQueue.volume/200);
                            msg.channel.send(`원래 소리로 돌아갔어요, 현재 볼륨:${serverQueue.volume}%`)
                        }
                    break;

                    case "🔉":
                        serverQueue.volume=Math.max(serverQueue.volume-10, 0);
                        dispatcher.setVolume(serverQueue.volume/200);
                        msg.channel.send(`현재 볼륨:${serverQueue.volume}%`);
                    break;

                    case "🔊":
                        serverQueue.volume=Math.min(serverQueue.volume+10, 100);
                        dispatcher.setVolume(serverQueue.volume/200);
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

    const CommandBasic="./Commands/basic/";
    const CommandMusic="./Commands/music/";

    if(msg.content.startsWith(GV.PREFIX)){//명령어 어두 감지
        const [CMD_NAME, ...args] = msg.content.trim().substring(GV.PREFIX.length).split(/\s+/);//문장 정리
        let cmdCheck=false;

        const Command_BASIC=require("./Commands/CmdBasic.json");
        let cmd = Object.keys(Command_BASIC).find( (property) => //Command.js 파일에서 모든 프로퍼티를 문자배열화 시킴
            Command_BASIC[property].find( element=>element==CMD_NAME )!=undefined// 그 프로퍼티 배열 안에서 CMD_NAME과 같은 문자열 찾기
        );
        const permissions = msg.channel.permissionsFor(msg.client.user);
        
        //코드 시작 CommandBasic
        switch(cmd){
            case "테스트":
                
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
                msg.channel.send({embed : require(CommandBasic+"CmdHelp.js").helpEmbed});
            break;

            case "개발":
                msg.channel.send({embed : require(CommandBasic+"CmdDev.js").devEmbed});
            break;

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
                    
                    const argsArr=await func.effectiveArr(args.toString(),",",1,8);//배열이 유효한지 조사
                    
                    if(argsArr.length==0){msg.channel.send("올바른 명령이 입력되지 않아 삭제 명령이 취소되었습니다.");}
                    else{musicBot.remove(msg, argsArr);}

                    msgResponse.set(msg.member.id,//멤버를 기준으로
                        {
                            guild: msg.guild.id,    cmd: "musicRemove",
                            args: argsArr,//이게 실제 명령어
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

                        if(msgArr.length==0) {//리스트에 추가할 게 없을 때(즉, 검색이 유효하지 않으면 바로 취소함)
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

//bot.login(GV.LoginBotToken);