const bot = require("./../../../bot2");
const musicBot=require("./musicBot");

module.exports = {
	name: "검색",
	cmd: ["검색", "노래검색", "ㄴㄹㄱㅅ", "ㄴㄺㅅ"],
    type: "music",
    //찾은 유튜브 주소를 배열에 집어넣는 함수
    async execute(msg, args){
        if (!msg.member.voice.channel)
            return msg.channel.send("보이스채널에서 해주세요");
        
        if(args.length==0)
            return msg.channel.send("검색어를 입력해주세요");

        //명령 대기 체크
        const bot=require("./../../../bot2").bot;
        if(!bot.guildCmdQueue.get(msg.guild.id))
            return msg.reply(`명령어를 사용하려면 ${this.name} 명령어가 끝날 때까지 기다려야 합니다.`);
        bot.guildCmdQueue.set(msg.guild.id, false);

        const searchStr=args.join(" ");
        
        const limit = 8;  // 출력 갯수

        const embedSearchYoutube = {
            title:"노래 검색 목록",
            color: 0xF7CAC9,
            description:`**${searchStr}**에 대한 검색 결과에요~`,
            fields: []
        }

        var items = await musicBot.searchYoutubeList(searchStr, limit); // 결과 중 items 항목만 가져옴
        for (var i in items) {
            let n=i; n++;
            const explItem={
                name: '\u200b',
                value: `[${n}. ${items[i].title}](https://www.youtube.com/watch?v=${items[i].url})`,//markdown 사용
                url: items[i].url
            };
            embedSearchYoutube.fields.push(explItem);
        }
        msg.channel.send({embed: embedSearchYoutube});
        await this.react(embedSearchYoutube);
        bot.guildCmdQueue.set(msg.guild.id, true);//명령 대기 확인
    }, 
    async react(embed){
        let check=false;
        bot.bot.on("message", async (msg)=>{
            if(check || msg.author.bot) return;
            const msgArr=await func.effectiveArr(msg.content,",",1,8);//배열이 유효한지 조사

            if(msgArr.length==0) //리스트에 추가할 게 없을 때(즉, 검색이 유효하지 않으면 바로 취소함)
                return msg.channel.send("유효하지 않은 대답이에요. 노래 검색 취소할게요..;;");

            while(msgArr.length>0){
                const tmpStr=embed.fields[msgArr.shift()].url.split(/\s+/);
                await require("./musicExecute").execute(msg, tmpStr);
            }
            msg.delete();
            check=true;
        });
    }
};