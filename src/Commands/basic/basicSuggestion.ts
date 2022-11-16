import { cmd } from "../../type";

export const basicSuggestion: cmd = {
	name: `건의`,
	cmd: ['건의'],
	type: "basic",
	permission: [""],
	execute(msg, args) {
		const {bot}=require('../../../bot');
		const content=args.join(" ");

		if(content=="") return msg.channel.send("공백은 건의할 수 없어요. 정당한 사항을 건의해주세요!");
		else return bot.users.cache.get(process.env.OWNER_ID).send(`'${msg.guild.name}'길드의 '${msg.channel.id}'채널에서 '${msg.author.username}'님이 건의사항 보내주셨어요.\n> ${content}`);
	},
};