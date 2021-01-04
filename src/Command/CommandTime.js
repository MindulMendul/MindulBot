const moment = require('moment');

async function Commandtime(msg){
    if(msg.author.tag == "박민규#7504"){ // 나
        msg.reply("명을 받들게 되어 망극하옵나이다.\n"
        +moment().format("지금 시각은 HH시 mm분이옵니다, 주인님"));
    } else if (
        msg.author.tag == "전정효#2520"       //파리 현지인 1
    || msg.author.tag == "퍄퍄파이#0247"     //파리 현지인 2
    ){
        if(Math.random()>0.3){
            msg.reply("파리의 시간을 사는 당신에 맞춰 보여드립니다.(-8시간)\n"
            +moment().add(-8,"hours").format("지금 시각은 HH시 mm분입니다."));
        } else {
            msg.reply("LA의 시간을 사는 당신에 맞춰 보여드립니다.(-17시간)\n"
            +moment().add(-17,"hours").format("지금 시각은 HH시 mm분입니다."));
        }
    } else { // 정상인
        msg.reply(moment().format("지금 시각은 HH시 mm분입니다."));
    }
}
exports.CommandTime=Commandtime;