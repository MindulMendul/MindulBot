import { cmd } from "../../type";

const {MessageActionRow, MessageButton}=require('discord.js');

export const basicDice: cmd = {
	name: `주사위`,
	cmd: ["데굴", "데굴데굴", "주사위", "ㄷㄱㄷㄱ"],
	type: "basic",
	permission: [""],
	async execute(msg) {
		const button = new MessageActionRow()//첫 번째 줄 버튼
        .addComponents(new MessageButton().setCustomId('🛎️').setLabel('🛎️').setStyle('PRIMARY'),);
		
		const filter = (i: { user: { id: string; }; message: { id: string; }; }) => {
			return (i.user.id===msg.author.id) && (i.message.id===msgDice.id)
		};
        const collector = msg.channel.createMessageComponentCollector({filter});
        collector.on('collect', async i => {
			const contentNum=Number(i.message.content.charAt(i.user.tag.length+3))+1;
			i.update({content:`${i.user.tag}님의 ${contentNum}번째 주사위 결과입니다.\n> ${Math.ceil(Math.random()*6)}`, components:[button]});
		});
		const msgDice=await msg.channel.send({content:`${msg.author.tag}님의 1번째 주사위 결과입니다.\n> ${Math.ceil(Math.random()*6)}`, components:[button]});
		return;
	},
};