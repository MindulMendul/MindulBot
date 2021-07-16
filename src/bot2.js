require('dotenv').config();

const {Client} = require('discord.js');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul"); //서울 시간

const bot = new Client();
const GV=require("../GlobalVariable");

var cmdMap = new Map();//music searching 같은 명령어에 대한 변수 관리
const func=require("./func");//잡다한 함수 모음

bot.on('ready', async () => {//정상적으로 작동하는지 출력하는 코드
    console.log(`${bot.user.tag}님이 로그인했습니다.`);
    console.log(moment().format("YYYY년 MM월 DD일 HH시 mm분 ss초"));
    bot.user.setActivity('성적에서 F만 피', { type: 'PLAYING' });

    exports.bot=bot;
});

bot.on('message', async (msg) => {
    const [CMD_NAME, ...args] = msg.content.trim().substring(GV.PREFIX.length).split("/");//문장 정리
    const Command_BASIC=require("./Commands/CmdBasic.json");
    let cmd = Object.keys(Command_BASIC).find( (property) => //Command.js 파일에서 모든 프로퍼티를 문자배열화 시킴
        Command_BASIC[property].find( element=>element==CMD_NAME )!=undefined// 그 프로퍼티 배열 안에서 CMD_NAME과 같은 문자열 찾기
    );
});