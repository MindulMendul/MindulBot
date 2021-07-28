const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;

module.exports = {
	name: "큐",
	cmd: ["큐", "목록", "노래목록"],
    type: "music",
    execute(msg){
        const serverQueue = musicQueue.get(msg.guild.id);

        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요");

        if(!serverQueue)
            return msg.channel.send("재생목록에 노래가 없어요!");
        else{
            //명령 대기 체크
            const bot=require("./../../../bot2").bot;
            if(!bot.guildCmdQueue.get(msg.guild.id))
                return msg.reply(`명령어를 사용하려면 ${this.name} 명령어가 끝날 때까지 기다려야 합니다.`);
            bot.guildCmdQueue.set(msg.guild.id, false);

            let i=1;//첫 라벨은 그냥

            const embedQueue = {
                color: 0xF7CAC9,
                title:"큐에 들어간 노래 목록",
                fields: []
            }

            serverQueue.songs.forEach(element => {
                const explSong = {
                    name:'\u200b',
                    value: `${i++}. ${element.title}`
                }
                embedQueue.fields.push(explSong);
            });
            
            bot.guildCmdQueue.set(msg.guild.id, true);//명령 대기 확인
            return msg.channel.send({embed: embedQueue});
        }
    }
};            