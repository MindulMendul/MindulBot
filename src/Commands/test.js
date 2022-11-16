const { search } = require("play-dl");
const { OWNER_ID } = require("../../GlobalVariable");

module.exports = {
	name: "테스트",
	cmd: ["테스트","ㅌㅅㅌ","ㅎ"],
	type: "test",
	permission: [""],
	needReact: false,
	async execute(msg, args) {
		if(msg.member.user.id!=OWNER_ID) return;
		const searchStr=args.join(" ");
		const vsqq=(await search(searchStr, { source : { youtube : "video" }, limit: 1})).pop();
		console.log(vsqq);
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