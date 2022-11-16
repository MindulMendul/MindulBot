const { OWNER_ID } = require("../../GlobalVariable");
const {musicQueue}=require("./../Commands/music/musicBot");

module.exports = {
	name: "테스트",
	cmd: ["테스트","ㅌㅅㅌ","ㅎ"],
	type: "test",
	permission: "",
	needReact: false,
	async execute(msg) {
		if(msg.author.id!=OWNER_ID) return;
		console.log(musicQueue);
	},
};

/*일반 명령어 예시
module.exports = {
	name: "테스트",
	cmd: ["테스트"],
	type:"test",
	permission: "",
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
	permission: "",
	async execute(msg) {
		await msg.channel.send('아라아라~');
		this.react(msg);
	},
	async react(msg){
		const msgFilter = (msg) => {
            return (필터);
        }
        const collector = msg.createMessageCollector(msgFilter, {max, maxProcessed});
        collector.on('collect', (msg) => {
			//메시지 함수
		}
	}
};

/*이모지를 달아야 하는 명령어 예시
module.exports = {
	name: "테스트",
	cmd: ["테스트"],
	type:"test",
	permission: "",
	async execute(msg) {
		const reactTargetMsg=await msg.channel.send('아라아라~');
		this.react(reactTargetMsg, msg);
	},
	async react(reactTargetMsg, msg){
		const reactionFilter = (reaction, user) => {
            return (필터);
        }
        const collector = reactTargetMsg.createReactionCollector(reactionFilter, {maxEmojis, maxUsers, max});
        collector.on('collect', (reaction, user) => {
			//리액션 함수
		}
	}
};

*/