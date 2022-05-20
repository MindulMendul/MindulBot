import { cmd } from "../../type";
import { bot } from "../../../bot";

export const basicGongji: cmd = {
	name: `공지`,
	cmd: ["공지"],
	type: "basic",
    permission: [""],
	execute(msg) {
        console.log("ㅎㅇ");
        let findingChannel: any;
        const args=msg.content.slice(3,msg.content.length).trim().split(/\s*\/\s*/);
        console.log(args);
        bot.guilds.cache.find( (guild: any) => {//길드 이름 찾기
            if (guild.name == args[0]) {
                guild.channels.cache.find((channel: any) => {//서버 이름 찾기
                    if (channel.name == args[1]) { findingChannel=channel; return true; }//공지 메시지 보내기
                })
            }
            return false;
        })
        return findingChannel.send(args[2]);
	},
};