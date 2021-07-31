const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;

module.exports = {
	name: "비우기",
	cmd: ["비우기", "ㅂㅇㄱ"],
    type: "music",
    async execute(msg){
        const serverQueue = musicQueue.get(msg.guild.id);
    
        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요");
        
        if (!serverQueue)
            return msg.channel.send("멈출 노래가 없는데요?");

        try{
            serverQueue.connection.dispatcher.end();
            serverQueue.songs = [];
        }catch(err){
            if(err=="TypeError: Cannot read property 'end' of null") return msg.channel.send("멈출 노래가 없는데요?");
            else msg.channel.send(`비우기 명령어에 고장이 났어요. 가끔씩 이러는데 왜 그러는지 최대한 빨리 파악해볼게요, 죄송합니다 ㅠㅠ\n${err}`);
        }
    }
};