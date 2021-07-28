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

        //명령 대기 체크
        const bot=require("./../../../bot2").bot;
        if(!bot.guildCmdQueue.get(msg.guild.id))
            return msg.reply(`명령어를 사용하려면 ${this.name} 명령어가 끝날 때까지 기다려야 합니다.`);
        bot.guildCmdQueue.set(msg.guild.id, false);
        
        serverQueue.connection.dispatcher.end();
        bot.guildCmdQueue.set(msg.guild.id, true);//명령 대기 확인
    }
};