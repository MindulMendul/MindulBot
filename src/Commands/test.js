const { OWNER_ID } = require("../../GlobalVariable");

module.exports = {
	name: "테스트",
	cmd: ["테스트","ㅌㅅㅌ","ㅎㅇ"],
	type: "test",
	execute(msg) {
		if(msg.author.id!=OWNER_ID) return;
		msg.channel.send('아라아라~');
	},
};

/*
module.exports = {
	name: "테스트",
	cmd: ["테스트"],
	type:"test",
	execute(msg) {
		msg.channel.send('아라아라~');
	},
};
*/