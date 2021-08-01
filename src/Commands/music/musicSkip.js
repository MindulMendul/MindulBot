const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;

module.exports = {
	name: "스킵",
	cmd: ["스킵", "다음"],
    type: "music",
    async execute(msg){
        const serverQueue = musicQueue.get(msg.guild.id);
    
        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요!");
        
        if (msg.member.voice.channel!=serverQueue.voiceChannel)
            return msg.channel.send("같은 보이스채널에서 해주세요!");
        
        if (!serverQueue)
            return msg.channel.send("넘길 노래가 없어요!");

        await serverQueue.connection.dispatcher.end();
        serverQueue.skip=true;
    }
};