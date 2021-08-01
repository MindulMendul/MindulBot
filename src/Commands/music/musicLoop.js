const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;

module.exports = {
	name: "루프",
	cmd: ["루프","반복","loop"],
    type: "music",
    execute(msg){
        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요!");

        const serverQueue = musicQueue.get(msg.guild.id);
        if (!serverQueue)
            return msg.channel.send("재생목록에 노래가 없어요!");
        
        if (msg.member.voice.channel!=serverQueue.voiceChannel)
            return msg.channel.send("같은 보이스채널에서 해주세요!");
        
        serverQueue.loop=!(serverQueue.loop);
        if(serverQueue.loop) msg.channel.send("큐 반복 기능이 활성화되었습니다~");
        else msg.channel.send("더이상 큐에 있던 녀석들이 반복되지 않아요!");
    }
};