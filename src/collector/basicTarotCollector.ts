import { ButtonInteraction, Message } from 'discord.js';
import { script } from '../assets/tarot/TarotList';

export const basicTarotCollector = async (msg: Message, options:any) => {
  return new Promise( async(resolve, reject)=>{
    const collector = msg.createMessageComponentCollector(options);
    collector.on('collect', async (i: ButtonInteraction) => {
      const tarotEmbed = {
        color: 0xf7cac9,
        author: {
          name: '민둘봇의 타로 하트',
          icon_url: 'https://i.imgur.com/AD91Z6z.jpg'
        },
        description: `${i.component.label}를 고른 당신!`,
        fields: [{ name: `오늘은 **${script[i.customId][0]}**이에요`, value: script[i.customId][2] }],
        image: { url: script[i.customId][1] },
        footer: {
          text: `모든 설명은 심리학 이론인 바넘효과를 바탕으로 작성되었습니다.`,
          icon_url: 'https://i.imgur.com/AD91Z6z.jpg'
        }
      };
      await i.update({ embeds: [tarotEmbed], components: [] });
      resolve(undefined);
    });
  });
}
      