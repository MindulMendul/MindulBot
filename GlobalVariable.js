exports.OWNER_ID="554178159717777420";

//봇 로그인 //테섭과 본섭 로그인 구별
const Token="MORMOTTE";
if (Token=="BOT") {//봇 로그인
    exports.LoginBotToken=process.env.BOT_TOKEN;
    exports.PREFIX="ㅣ";
    exports.activityString="성적에서 F만 피";
}
else{//모르모트 로그인
    exports.LoginBotToken=process.env.MORMOTTE_TOKEN;
    exports.PREFIX="ㅏ";
    exports.activityString="테스트";
}