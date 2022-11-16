const {getVoiceConnection,} = require('@discordjs/voice');

module.exports = {
	name: "스킵",
	cmd: ["스킵", "다음"],
    type: "music",
    permission: [""],
    async execute(msg){
        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요!");
        //return msg.channel.send("같은 보이스채널에서 해주세요!");

        const connection = getVoiceConnection(msg.guild.id);
        if(connection==undefined) {
            msg.channel.send("재생목록에 노래가 없어요!");
        } else {
            connection.subscription.player.stop();
            connection.subscription.option.skip=true;
        }
    }
};