const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;

module.exports = {
	name: "스킵",
	cmd: ["스킵", "다음"],
    type: "music",
    async execute(msg){
        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요!");
        
        const serverQueue = musicQueue.get(msg.guild.id);
        if (!serverQueue)
            return msg.channel.send("재생목록에 노래가 없어요!");

        if (msg.member.voice.channel!=serverQueue.voiceChannel)
            return msg.channel.send("같은 보이스채널에서 해주세요!");

        serverQueue.dispatcher.resume();
        
        await serverQueue.dispatcher.end();
        serverQueue.skip=true
    }
};