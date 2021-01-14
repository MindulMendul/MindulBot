require('dotenv').config();

const {Client, Discord, TextChannel} = require('discord.js');
const Queue = require('queue-fifo');
const moment = require('moment');
const { CommandNaga } = require('./Commands/basic/CommandNaga');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul"); // 서울 시간

const bot = new Client();

const GV = require("./../GlobalVariable.js");
const PREFIX=GV.PREFIX;
const PREFIX_REACTION_MF="@#$4578$#@"; // 중지 이모지 반응용(중지 날린 곳에 지문 남긴 것)

const MORMOTTE_ID="751773063766343721";

var msgMiddleFinger=0; // 중지 이모지 반응용 변수
var nagaStance=0; // 나가라고 전에 삼고초려 변수

bot.on('ready', async () => {
    console.log(`${bot.user.tag}님이 로그인했습니다.`);
    console.log(moment().format("YYYY년 MM월 DD일 HH시 mm분 ss초"));
    bot.user.setActivity('성적표에 F만 피', { type: 'PLAYING' });
    //프로그램 고칠 땐 문구를 "결국 전공 수업에서 F를 피하지 못하"로 바꿔두기
});

function equalTime(h, m) {
    return (moment().hour()==h && moment().minute()==m);
}
var http = require("http");
const { error, Console } = require('console');
setInterval( () => {
        http.get("http://mindulbot.herokuapp.com");
    }, 20*60*1000); // every 20 minutes
setInterval( () => {
    const reminderMessage="펀치킹치러 가세요~";
    if(equalTime(23, 0) || equalTime(21, 0)){
        bot.guilds.cache.forEach( (guild)=>{
            if(guild.name!="민둘이의 실험방") return;
            const guildReminder=guild.channels.cache.find( (channel)=>{
                if(channel.name.startsWith('소야봇'))
                    return channel; //소야봇-공지
                else if(channel.name.startsWith('민둘봇'))
                    return channel; //민둘봇-공지 
            });
            try{
                guildReminder.send(reminderMessage)
                .then( msg =>
                    msg.delete({timeout: 50*1000})
                );
            } catch {
                guild.systemChannel.send(reminderMessage)
                .then( msg => 
                    msg.delete({timeout: 50*1000})
                );
            }
        })
    }
}, 60*1000); // every 20 minutes

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
        const Command_BASIC=require(CommandBasic+"Command.json");
        const cmd = Object.keys(Command_BASIC).find( (property) => //Command.js 파일에서 모든 프로퍼티를 문자배열화 시킴
            Command_BASIC[property].find( element=>element==CMD_NAME )!=undefined// 그 프로퍼티 배열 안에서 CMD_NAME과 같은 문자열 찾기
        );

        //코드 시작
        switch(cmd){
            case "나가":
                require(CommandBasic+"CommandNaga.js")
                .CommandNaga(msg);
            break;
            
            case "시간":
                require(CommandBasic+"CommandTime.js")
                .CommandTime(msg);
            break;

            case "날짜":
                require(CommandBasic+"CommandDate.js")
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
                require(CommandBasic+"CommandAngry.js")
                .CommandAngry(msg);
            break;

            case "도움말":
                const helpEmbed=require(CommandBasic+"CommandHelp.js").helpEmbed;
                msg.channel.send({embed : helpEmbed});
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
            
            default:
                msg.channel.send("명령어로 사용될 수 있는지 검토해볼게요~");
                console.log(CMD_NAME);
            break;
        }
    } else {//명령어 어두 비감지
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

            case "한로원":
                msg.channel.send("로바~");
            break;

            case "로바":
                msg.channel.send("로원 바보라는 뜻~");
            break;
            
            case "레순튀":
                msg.channel.send("레또팅!!");
            break;
        }
    }
});

bot.on('guildMemberAdd',async (member) => {
    console.log(`${member.user.tag}: 접속`);
});

bot.login(process.env.BOT_TOKEN);