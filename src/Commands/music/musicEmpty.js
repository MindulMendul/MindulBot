const {getVoiceConnection,} = require('@discordjs/voice');

module.exports = {
	name: "비우기",
	cmd: ["비우기", "ㅂㅇㄱ"],
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
            connection.subscription.songs=[];
            connection.subscription.player.stop();
            connection.subscription.option.skip=true;
        }
    }
};