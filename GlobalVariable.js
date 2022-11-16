const BOT_ID="751733763838443530";
const MORMOTTE_ID="751773063766343721";
const OWNER_ID="554178159717777420";

//봇 로그인 //테섭과 본섭 로그인 구별
let Token="M", ID=Token;
if(Token="M")//모르모트 로그인
{Token=process.env.MORMOTTE_TOKEN;   ID=MORMOTTE_ID;}
else if (login="B")//봇 로그인
{Token=process.env.MORMOTTE_TOKEN;   ID=MORMOTTE_ID;}

const LoginBotToken=Token; exports.LoginBotToken=LoginBotToken; 
const LoginBotID=ID; exports.LoginBotID=LoginBotID;
const PREFIX="ㅏ"; exports.PREFIX=PREFIX;