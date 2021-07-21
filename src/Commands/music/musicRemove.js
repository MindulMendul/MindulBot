module.exports = {
	name: "제거",
	cmd: ["제거", "삭제", "ㅈㄱ", "ㅅㅈ"],
    type: "music",
	//remove 함수
    async execute(msg, args){
        const argsArr=await func.effectiveArr(args.toString(),",",1,8);//배열이 유효한지 조사
        
        const serverQueue = musicQueue.get(msg.guild.id);
        
        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요");
        
        if(!serverQueue)
            return msg.channel.send("재생목록에 노래가 없어요!");
        
        if(argsArr==[])
            return msg.channel.send("어떤 곡을 지울지 모르겠어요!");
        
        let tempStr="해당 노래가 맞아요?\n";
        argsArr.forEach(element=>{
            tempStr+=`> **${element+1}. ${serverQueue.songs[element].title}**\n`;
        });
        tempStr+="7초의 시간을 드릴 거에요!\n맞으면 네, 아니라면 그 밖에 아무 말이나 하세요.";
        msg.channel.send(tempStr);
    }
};