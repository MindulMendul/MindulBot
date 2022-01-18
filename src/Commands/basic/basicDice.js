module.exports = {
	name: `주사위`,
	cmd: ["데굴", "데굴데굴", "주사위", "ㄷㄱ", "ㄷㄱㄷㄱ"],
	type: "basic",
	permission: [""],
	execute(msg) {
		return msg.channel.send(`주사위 결과 : ${Math.ceil(Math.random()*6)}`);
	},
};