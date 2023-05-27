import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } from 'discord.js';
import { basicTarotCollector } from '../../collector/basicTarotCollector';
import { CMD } from '../../types/type';

export const basicTarot: CMD = {
  name: `타로`,
  cmd: ['타로', 'ㅌㄹ', '운세', '오늘의운세'],
  type: 'basic',
  permission: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.EmbedLinks],
  //타로하트 생성과정
  async execute(msg) {
    return new Promise(async (resolve, reject)=>{ try {
      const tarotEditedEmbed = new EmbedBuilder({
        color: 0xf7cac9,
        author: {
          name: '민둘봇의 타로 하트',
          icon_url: 'https://i.imgur.com/AD91Z6z.jpg'
        },
        description: '6개의 이모지로 입력된 하트를 하나만 아무거나 선택해 주세요!',
        image: { url: 'https://i.imgur.com/SP7ND76.png' }
      });

      const button1 = new ActionRowBuilder()
        .addComponents(new ButtonBuilder().setCustomId('0').setLabel('❤️').setStyle(ButtonStyle.Secondary))
        .addComponents(new ButtonBuilder().setCustomId('1').setLabel('🧡').setStyle(ButtonStyle.Secondary))
        .addComponents(new ButtonBuilder().setCustomId('2').setLabel('💛').setStyle(ButtonStyle.Secondary));

      const button2 = new ActionRowBuilder()
        .addComponents(new ButtonBuilder().setCustomId('3').setLabel('💚').setStyle(ButtonStyle.Secondary))
        .addComponents(new ButtonBuilder().setCustomId('4').setLabel('💙').setStyle(ButtonStyle.Secondary))
        .addComponents(new ButtonBuilder().setCustomId('5').setLabel('💜').setStyle(ButtonStyle.Secondary));

      const msgTarot = msg.channel.send({
        embeds: [tarotEditedEmbed],
        components: [button1, button2 as any]
      })

      const filter = (i: any) => i.user.id === msg.author.id;
      await basicTarotCollector(await msgTarot, { filter, time: 60000 });
      resolve(undefined); return;
    } catch(e) {reject(e)} });
  }
};
