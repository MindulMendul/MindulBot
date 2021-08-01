const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;

module.exports = {
	name: "큐",
	cmd: ["큐", "목록", "노래목록"],
    type: "music",
    async execute(msg){
        const serverQueue = musicQueue.get(msg.guild.id);

        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요!");

        if(!serverQueue)
            return msg.channel.send("재생목록에 노래가 없어요!");
        else {
            if (msg.member.voice.channel!=serverQueue.voiceChannel)
                return msg.channel.send("같은 보이스채널에서 해주세요!");

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

            return msg.channel.send({embed: embedQueue});
        }
    }
};            