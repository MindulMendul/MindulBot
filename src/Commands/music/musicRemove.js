const {getVoiceConnection,} = require('@discordjs/voice');
const func = require("./../../func");
module.exports = {
	name: "제거",
	cmd: ["제거", "삭제", "ㅈㄱ", "ㅅㅈ"],
    type: "music",
    permission: [""],
	//remove 함수
    async execute(msg, args){
        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요!");
        
        const connection = getVoiceConnection(msg.guild.id);
        if(connection==undefined) {
            return msg.channel.send("재생목록에 노래가 없어요!");
        }

        //if (msg.member.voice.channel!=serverQueue.voiceChannel)
        //    return msg.channel.send("같은 보이스채널에서 해주세요!");

        const argsArr=await func.effectiveArr(args.toString(),",",1,connection.subscription.songs.length);//배열이 유효한지 조사
        if(argsArr.length==0)
            return msg.channel.send("어떤 곡을 지울지 모르겠어요!");
        
        let tempStr="해당 노래가 맞아요?\n";
        argsArr.forEach(element=>{
            tempStr+=`> **${element+1}. ${connection.subscription.songs[element].metadata.title}**\n`;
        });
        tempStr+="7초의 시간을 드릴 거에요!\n맞으면 네, 아니라면 그 밖에 아무 말이나 하세요.";
        await msg.channel.send(tempStr);

        this.react(msg, argsArr, connection);
    },
    async react (msg, args, connection){
        const correctArr=["네","어","ㅇㅋ","ㅇㅇ","ㅇ","d","D","y","Y","알았어","dz","dd", "얍",'0'];

        //콜렉터 부분
        const reactionFilter = (msg) => {return !msg.author.bot;}
        const collector = msg.channel.createMessageCollector({reactionFilter, max:1, time:7000});
        collector.on('collect', async (msg) => {
            if(correctArr.includes(msg.content)){//긍정
                args.sort((a,b)=>{return b-a;})
                .forEach(element => {
                    connection.subscription.songs.splice(element,1);
                });
                await msg.channel.send("삭제 완료!");
                require("./musicShow").execute(msg)//큐에 남아있는 노래가 있다면 보여주기
            } else //부정
                msg.channel.send("부정의 의미로 받아들이고, 그대로 내버려둘게요.");
        });

        collector.on('end', collected => {
            if(!collected.first()) msg.channel.send("대답이 따로 없으니까 그냥 내비둘게요~");
        });
    }
};