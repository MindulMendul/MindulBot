const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;

module.exports = {
	name: "스킵",
	cmd: ["스킵", "끄기", "다음"],
    type: "music",
    execute(msg){
        const serverQueue = musicQueue.get(msg.guild.id);
    
        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요");
        if (!serverQueue||serverQueue.songs.length==0)
            return msg.channel.send("스킵할 노래가 없어요!");
        
        serverQueue.connection.dispatcher.end();
    }
};