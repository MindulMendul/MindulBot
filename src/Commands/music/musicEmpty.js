const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;

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

        //명령 대기 확인
        const bot=require("./../../../bot2").bot;
        if(!bot.guildCmdQueue.get(msg.guild.id))
            return msg.reply(`명령어를 사용하려면 ${this.name} 명령어가 끝날 때까지 기다려야 합니다.`);
        bot.guildCmdQueue.set(msg.guild.id, false);
        
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();

        bot.guildCmdQueue.set(msg.guild.id, true);//명령 대기 확인
    }
};