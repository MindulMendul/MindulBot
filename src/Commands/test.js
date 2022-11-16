const { OWNER_ID } = require("../../GlobalVariable");
const {musicQueue}=require("./../Commands/music/musicBot");
const {bot}=require("./../../bot");

module.exports = {
	name: "테스트",
	cmd: ["테스트","ㅌㅅㅌ","ㅎ"],
	type: "test",
	permission: [""],
	needReact: false,
	async execute(msg) {
		if(msg.member.user.id!=OWNER_ID) return;
		const permissions=msg.channel.permissionsFor(msg.member.user);
		msg.channel.send(`${msg.member.user.tag}의 권한\n> ${"ADD_REACTIONS"}: ${permissions.has("ADD_REACTIONS")}
			> ${"MANAGE_EMOJIS_AND_STICKERS"}: ${permissions.has("MANAGE_EMOJIS_AND_STICKERS")}
			> ${"SEND_MESSAGES"}: ${permissions.has("SEND_MESSAGES")}
			`);
		const permissions1=msg.channel.permissionsFor(bot.user);
		msg.channel.send(`${bot.user.tag}의 권한\n> ${"ADD_REACTIONS"}: ${permissions1.has("ADD_REACTIONS")}
			> ${"MANAGE_EMOJIS_AND_STICKERS"}: ${permissions1.has("MANAGE_EMOJIS_AND_STICKERS")}
			> ${"SEND_MESSAGES"}: ${permissions.has("SEND_MESSAGES")}
			`);
		console.log(`${msg.member.user.tag}의 ${permissions.bitfield}`);
		console.log(`${bot.user.tag}의 ${permissions1.bitfield}`);
	},
};

/*일반 명령어 예시
module.exports = {
	name: "테스트",
	cmd: ["테스트"],
	type:"test",
	permission: [""],
	async execute(msg) {
		msg.channel.send('아라아라~');
	},
};
*/

/*추가 메시지를 달아야 하는 명령어 예시
module.exports = {
	name: "테스트",
	cmd: ["테스트"],
	type:"test",
	permission: [""],
	async execute(msg) {
		await msg.channel.send('아라아라~');
		this.react(msg);
	},
	async react(msg){
		const filter = (msg) => {
            return (필터);
        }
        const collector = msg.channel.createMessageCollector({msgFilter, max, maxProcessed});
        collector.on('collect', (msg) => {
			//메시지 함수
		});
	}
};

/*이모지를 달아야 하는 명령어 예시
module.exports = {
	name: "테스트",
	cmd: ["테스트"],
	type:"test",
	permission: [""],
	async execute(msg) {
		const reactTargetMsg=await msg.channel.send('아라아라~');
		this.react(reactTargetMsg, msg);
	},
	async react(reactTargetMsg, msg){
		const filter = (reaction, user) => {
            return (필터);
        }
        const collector = reactTargetMsg.createReactionCollector({filter, maxEmojis, maxUsers, max});
        collector.on('collect', (reaction, user) => {
			//리액션 함수
		});
	}
};

*/

/* 퍼미션 체크 함수 테스트 중
	

*/