const BOT_ID="751733763838443530";
const MORMOTTE_ID="751773063766343721";
exports.OWNER_ID="554178159717777420";

//봇 로그인 //테섭과 본섭 로그인 구별
const Token="MORMOTTE";
if (Token=="BOT") {//봇 로그인
    exports.LoginBotToken=process.env.BOT_TOKEN;
    exports.LoginBotID=BOT_ID;
    const PREFIX="ㅣ"; exports.PREFIX=PREFIX;
}
else{//모르모트 로그인
    exports.LoginBotToken=require("./../imsi/.env").MORMOTTE_TOKEN;
    exports.LoginBotID=MORMOTTE_ID;
    const PREFIX="ㅏ"; exports.PREFIX=PREFIX;
}
