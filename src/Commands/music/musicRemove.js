const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;
let scheduling=musicBot.scheduling;

module.exports = {
	name: "제거",
	cmd: ["제거", "삭제", "ㅈㄱ", "ㅅㅈ"],
    type: "music",
	//remove 함수
    async execute(msg, args){
        const serverQueue = musicQueue.get(msg.guild.id);

        const argsArr=await func.effectiveArr(args.toString(),",",1,serverQueue.songs.length);//배열이 유효한지 조사

        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요");
        
        if(!serverQueue)
            return msg.channel.send("재생목록에 노래가 없어요!");
        
        if(argsArr.length==0)
            return msg.channel.send("어떤 곡을 지울지 모르겠어요!");

        //명령 대기 체크
        const bot=require("./../../../bot").bot;
        if(!bot.guildCmdQueue.get(msg.guild.id))
            return msg.reply(`명령어를 사용하려면 ${this.name} 명령어가 끝날 때까지 기다려야 합니다.`);
        bot.guildCmdQueue.set(msg.guild.id, false);
        
        let tempStr="해당 노래가 맞아요?\n";
        argsArr.forEach(element=>{
            tempStr+=`> **${element+1}. ${serverQueue.songs[element].title}**\n`;
        });
        tempStr+="7초의 시간을 드릴 거에요!\n맞으면 네, 아니라면 그 밖에 아무 말이나 하세요.";
        await msg.channel.send(tempStr);
        scheduling=setTimeout(()=>{
            msg.channel.send("대답이 따로 없으니까 그냥 내비둘게요~");
        },7*1000)//setTimeout 켜고 끄게 하려고

        await this.react(argsArr);
        bot.guildCmdQueue.set(msg.guild.id, true);//명령 대기 확인
    },
    async react (args){
        const bot=require("./../../../bot").bot;
        const correctArr=["네","어","ㅇㅋ","ㅇㅇ","ㅇ","d","D","y","Y","알았어","dz","dd", "얍"];

        let check=false;
        bot.on("message",async (msg)=>{
            if(msg.author.bot) {check=true; return;}
            if(check) return;
            if(correctArr.includes(msg.content)){//긍정
                clearTimeout(scheduling);
                args.sort((a,b)=>{return b-a;})
                .forEach(element => {
                    if(element==0){require("./musicSkip").execute(msg);}
                    else{musicBot.musicQueue.get(msg.guild.id).songs.splice(element,1);}
                });
                await msg.channel.send("삭제 완료!");
                if(musicBot.musicQueue.get(msg.guild.id).songs.length>0)
                    require("./musicShow").execute(msg)//musicBot.show(msg);//큐에 남아있는 노래가 있다면 보여주기
            } else //부정
                msg.channel.send("부정의 의미로 받아들이고, 그대로 내버려둘게요.");
                clearTimeout(scheduling);
            check=true;
        });
    }
};