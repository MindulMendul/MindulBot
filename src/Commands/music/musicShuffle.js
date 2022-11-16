const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;

module.exports = {
	name: "셔플",
	cmd: ["셔플","ㅅㅍ","shuffle"],
    type: "music",
	//shuffle 함수
    async execute(msg){
        const func=require("./../../func.js");
        const serverQueue = musicQueue.get(msg.guild.id);

        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요");

        if(!serverQueue)
            return msg.channel.send("재생목록에 노래가 없어요!");
        else{
            //명령 대기 체크
            const bot=require("./../../../bot").bot;
            if(!bot.guildCmdQueue.get(msg.guild.id))
                return msg.reply(`명령어를 사용하려면 ${this.name} 명령어가 끝날 때까지 기다려야 합니다.`);
            bot.guildCmdQueue.set(msg.guild.id, false);

            let temp=serverQueue.songs.shift();//맨 앞 큐는 재생 중인 노래
            func.shuffle(serverQueue.songs);
            serverQueue.songs.unshift(temp);//맨 앞 큐를 다시 집어넣음
            await msg.channel.send("큐에 들어간 곡이 무작위로 재배치되었습니다!");
            bot.guildCmdQueue.set(msg.guild.id, true);//명령 대기 확인
            //show(msg);
        }
	},
};