const {getVoiceConnection,} = require('@discordjs/voice');

module.exports = {
	name: "큐",
	cmd: ["큐", "목록", "노래목록"],
    type: "music",
    permission: [""],
    async execute(msg){
        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요!");
        
        const connection = getVoiceConnection(msg.guild.id);
        if(!connection)
            return msg.channel.send("재생목록에 노래가 없어요!");
        
        if(msg.member.voice.channelId!=connection.joinConfig.channelId)
            return msg.channel.send("같은 보이스채널에서 해주세요!");

        const subscription=connection.subscription;
        let i=1;//첫 라벨은 그냥
        const embedQueue = {
            color: 0xF7CAC9,
            title:"큐에 들어간 노래 목록",
            description:`현재 재생중인 노래\n ${subscription.player._state.resource.metadata.title}`,
            fields: []
        }

        subscription.songs.forEach(element => {
            const explSong = {
                name:'\u200b',
                value: `${i++}. ${element.metadata.title}`
            }
            embedQueue.fields.push(explSong);
        });
        return msg.channel.send({embeds: [embedQueue]});
    },
};            