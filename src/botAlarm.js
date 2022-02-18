const bot=require("../bot").bot;

//테스트용
/*
setTimeout(() => {
    bot.guilds.cache.find(guild=>guild.name=="민둘이의 실험방")
    .channels.cache.find(ch=>ch.name=="순튀봇")
    .send("ㅎㅇ");
}, 1000);
*/

const moment = require('moment');
const { send } = require("process");

//타로 카드 셔플
func=require("./func");
setImmediate(()=>{
    func.shuffle(require("./Commands/basic/TarotList").script);
    setInterval(()=>{
        if(moment().hour()==0)
            func.shuffle(require("./Commands/basic/TarotList").script);
    },24*60*60*1000)//24시간
});

//기본길드 전용 알람(현재는 그럼)
setInterval( () => {
    if(moment().minute()==25){//매 시간 25분마다 알람
        const reminderMessage=`${moment().hour()}시 플래그하러 가세요~`;
        bot.guilds.cache.filter((guild)=>{
            return (guild.name==="💛 기본 💛");
        }).first().channels.cache.filter((channel)=>{
            return (channel.name.startsWith('민둘봇'));
        }).first().send(reminderMessage).then( msg =>{
            setTimeout( () => {msg.delete();},10*60*1000);
        });
    }
}, 60*1000); // every minutes