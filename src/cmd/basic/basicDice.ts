import { MessageActionRow, MessageButton } from 'discord.js';
<<<<<<< HEAD
import { TextChannel } from 'discord.js';
import { CMD } from '../../types/type';

export const basicDice: CMD = {
  name: `주사위`,
  cmd: ['데굴', '데굴데굴', '주사위', 'ㄷㄱㄷㄱ'],
  type: 'basic',
  permission: [],
  async execute(msg) {
    const button = new MessageActionRow() //첫 번째 줄 버튼
      .addComponents(new MessageButton().setCustomId('🛎️').setLabel('🛎️').setStyle('PRIMARY'));

    const filter = (i: { user: { id: string }; message: { id: string } }) => {
      return i.user.id === msg.author.id && i.message.id === msgDice.id;
    };

    const channel = msg.channel as TextChannel;
    const collector = channel.createMessageComponentCollector({ filter });
    collector.on('collect', async (i) => {
      const content = i.message.content;
      const contentNum =
        Number(
          content
            .trim()
            .split(/[^0-9]/g)
            .filter((e) => {
              return e.length > 0;
            })[1]
        ) + 1;
      i.update({
        content: `${i.user.tag}님의 ${contentNum}번째 주사위 결과입니다.\n> ${Math.ceil(Math.random() * 6)}`,
        components: [button]
      });
    });
    const msgDice = await msg.channel.send({
      content: `${msg.author.tag}님의 1번째 주사위 결과입니다.\n> ${Math.ceil(Math.random() * 6)}`,
      components: [button]
    });
    return;
  }
};
=======
import { TextChannel } from "discord.js";
import { cmd } from "../../type";

export const basicDice: cmd = {
	name: `주사위`,
	cmd: ["데굴", "데굴데굴", "주사위", "ㄷㄱㄷㄱ"],
	type: "basic",
	permission: [],
	async execute(msg) {
		const button = new MessageActionRow()//첫 번째 줄 버튼
        .addComponents(new MessageButton().setCustomId('🛎️').setLabel('🛎️').setStyle('PRIMARY'),);
		
		const filter = (i: { user: { id: string; }; message: { id: string; }; }) => {
			return (i.user.id===msg.author.id) && (i.message.id===msgDice.id)
		};

		const channel = msg.channel as TextChannel;
        const collector = channel.createMessageComponentCollector({filter});
        collector.on('collect', async i => {
			const content=i.message.content;
			const contentNum=Number(content.trim().split(/[^0-9]/g).filter((e)=>{return e.length>0;})[1])+1;
			i.update({content:`${i.user.tag}님의 ${contentNum}번째 주사위 결과입니다.\n> ${Math.ceil(Math.random()*6)}`, components:[button]});
		});
		const msgDice=await msg.channel.send({content:`${msg.author.tag}님의 1번째 주사위 결과입니다.\n> ${Math.ceil(Math.random()*6)}`, components:[button]});
		return;
	},
};
>>>>>>> 0aba8f5e (basic 명령어 모두 실행가능하도록 변경)
