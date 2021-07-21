module.exports = {
	name: "비우기",
	cmd: ["비우기", "ㅂㅇㄱ"],
    type: "music",
    execute(msg){
        const serverQueue = musicQueue.get(msg.guild.id);
    
        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요");
    
        if (!serverQueue)
            return msg.channel.send("멈출 노래가 없는데요?");
        
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
};