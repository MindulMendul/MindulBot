const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;

module.exports = {
	name: "스킵",
	cmd: ["스킵", "다음"],
    type: "music",
    execute(msg){
        const serverQueue = musicQueue.get(msg.guild.id);
    
        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요");

        if (!serverQueue||serverQueue.songs.length==0)
            return msg.channel.send("스킵할 노래가 없어요!");
        try{
            serverQueue.connection.dispatcher.end();
        }catch(err){
            msg.channel.send("스킵 명령어에 고장이 났어요. 가끔씩 이러는데 왜 그러는지 최대한 빨리 파악해볼게요, 죄송합니다 ㅠㅠ");
            bot.users.cache.get(OWNER_ID).send(err);
        }
        
    }
};