const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;

module.exports = {
	name: "스킵",
	cmd: ["스킵", "다음"],
    type: "music",
    async execute(msg){
        const serverQueue = musicQueue.get(msg.guild.id);
    
        if (!msg.member.voice.channel){
            await msg.channel.send("보이스채널에서 해주세요");
            
            //명령어 끝났다는 신호 주기
            const bot=require("./../../../bot").bot;
            bot.guildCmdQueue.get(msg.guild.id).shift();
            return;
        }

        if (!serverQueue||serverQueue.songs.length==0){
            await msg.channel.send("스킵할 노래가 없어요!");
            
            //명령어 끝났다는 신호 주기
            const bot=require("./../../../bot").bot;
            bot.guildCmdQueue.get(msg.guild.id).shift();
            return;
        }
        try{
            serverQueue.connection.dispatcher.end();
            //명령어 끝났다는 신호 주기
            const bot=require("./../../../bot").bot;
            bot.guildCmdQueue.get(msg.guild.id).shift();
        }catch(err){
            await msg.channel.send(`스킵 명령어에 고장이 났어요. 가끔씩 이러는데 왜 그러는지 최대한 빨리 파악해볼게요, 죄송합니다 ㅠㅠ\n${err}`);
            
            //명령어 끝났다는 신호 주기
            const bot=require("./../../../bot").bot;
            bot.guildCmdQueue.get(msg.guild.id).shift();
        }
        
    }
};