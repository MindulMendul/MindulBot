module.exports = {
	name: `공지`,
	cmd: ["공지"],
	type: "basic",
    permission: [""],
	execute(msg) {
        console.log("ㅎㅇ");
        const {bot}=require("./../../../bot");

        const args=msg.content.slice(3,msg.content.length).trim().split(/\s*\/\s*/);
        console.log(args);
        bot.guilds.cache.find((guild) => {//길드 이름 찾기
            if (guild.name == args[0]) {
                guild.channels.cache.find((channel) => {//서버 이름 찾기
                    if (channel.name == args[1]) { channel.send(args[2]); }//공지 메시지 보내기
                })
            }
        })
	},
};