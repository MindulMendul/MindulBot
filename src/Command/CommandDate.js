const moment = require('moment');

async function Commanddate(msg) {
    if(msg.author.id===OWNER_ID){
        msg.reply(moment().format("오늘은 MM월 DD일(dddd) 입니다, 주인님."));
    } else {
    console.log(msg.author.username);
        msg.reply("날짜는 달력 찾아봐.");
    }
}
exports.CommandDate=Commanddate;