module.exports = {
	name: `시간`,
	cmd: ["시간", "ㅅㄱ"],
	type: "basic",
    permission: [""],
    async execute(msg) {
        const moment = require('moment');

		if(msg.author.id===process.env.OWNER_ID) { // 나
            msg.reply("명을 받들게 되어 망극하옵나이다.\n"
            +moment().format("지금 시각은 HH시 mm분이옵니다, 주인님"));
        } else {
            const dice=Math.random();
            if(dice<0.2) {
                msg.reply("파리의 시간을 사는 당신에 맞춰 보여드립니다.(-8시간)\n"
                +moment().add(-8,"hours").format("지금 시각은 HH시 mm분입니다."));
            } else if(dice<0.4) {
                msg.reply("LA의 시간을 사는 당신에 맞춰 보여드립니다.(-17시간)\n"
                +moment().add(-17,"hours").format("지금 시각은 HH시 mm분입니다."));
            } else { // 정상인
            msg.reply(moment().format("지금 시각은 HH시 mm분입니다."));
            }
        }
	}
};