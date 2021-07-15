const bot=require("./bot");

//테스트용
/*
setTimeout(() => {
    bot.guilds.cache.find(guild=>guild.name=="민둘이의 실험방")
    .channels.cache.find(ch=>ch.name=="순튀봇")
    .send("ㅎㅇ");
}, 1000);
*/

//기본길드 전용 알람(현재는 그럼)
setInterval( () => {
    if(moment().minute()==25){//매 시간 25분마다 알람
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