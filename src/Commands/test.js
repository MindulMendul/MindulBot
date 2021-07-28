const { OWNER_ID } = require("../../GlobalVariable");

module.exports = {
	name: "테스트",
	cmd: ["테스트","ㅌㅅㅌ","ㅎㅇ"],
	type: "test",
	async execute(msg) {
		if(msg.author.id!=OWNER_ID) return;
		msg.channel.send('아라아라~');
	},
};

/*
module.exports = {
	name: "테스트",
	cmd: ["테스트"],
	type:"test",
	async execute(msg) {
		msg.channel.send('아라아라~');
	},
};
*/

/*
module.exports = {
	name: "테스트",
	cmd: ["테스트"],
	type:"test",
	async execute(msg) {
		//명령 대기 체크
        const bot=require("./../../../bot2").bot;
        if(!bot.guildCmdQueue.get(msg.guild.id))
            return msg.reply(`명령어를 사용하려면 ${this.name} 명령어가 끝날 때까지 기다려야 합니다.`);
        bot.guildCmdQueue.set(msg.guild.id, false);

		await msg.channel.send('아라아라~');
		
		bot.guildCmdQueue.set(msg.guild.id, true);//명령 대기 확인
	},
};

*/