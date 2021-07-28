const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;

module.exports = {
	name: "루프",
	cmd: ["루프","반복","loop"],
    type: "music",
    execute(msg){
        //명령 대기 체크
        const bot=require("./../../../bot2").bot;
        if(!bot.guildCmdQueue.get(msg.guild.id))
            return msg.reply(`명령어를 사용하려면 ${this.name} 명령어가 끝날 때까지 기다려야 합니다.`);
        bot.guildCmdQueue.set(msg.guild.id, false);
        
        const serverQueue = musicQueue.get(msg.guild.id);
        serverQueue.loop=!(serverQueue.loop);
        if(serverQueue.loop) msg.channel.send("큐 반복 기능이 활성화되었습니다~");
        else msg.channel.send("더이상 큐에 있던 녀석들이 반복되지 않아요!");
        bot.guildCmdQueue.set(msg.guild.id, true);//명령 대기 확인
    }
};