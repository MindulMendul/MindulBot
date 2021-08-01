const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;

module.exports = {
	name: "비우기",
	cmd: ["비우기", "ㅂㅇㄱ"],
    type: "music",
    async execute(msg){
        const serverQueue = musicQueue.get(msg.guild.id);
    
        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요!");

        if (msg.member.voice.channel!=serverQueue.voiceChannel)
            return msg.channel.send("같은 보이스채널에서 해주세요!");
        
        if (!serverQueue)
            return msg.channel.send("비울 노래가 없어요!");

        serverQueue.connection.dispatcher.end();
        serverQueue.songs = [];
        serverQueue.skip=true;
    }
};