import { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } from 'discord.js';
import { script } from '../../assets/tarot/TarotList';
import { CMD } from '../../types/type';

export const basicTarot: CMD = {
  name: `타로`,
  cmd: ['타로', 'ㅌㄹ', '운세', '오늘의운세'],
  type: 'basic',
  permission: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.EmbedLinks],
  //타로하트 생성과정
  async execute(msg) {
    const tarotEditedEmbed = {
      color: 0xf7cac9,
      author: {
        name: '민둘봇의 타로 하트',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg'
      },
      description: '6개의 이모지로 입력된 하트를 하나만 아무거나 선택해 주세요!',
      image: { url: 'https://i.imgur.com/SP7ND76.png' }
    };

    const button1 = new ActionRowBuilder()
      .addComponents(new ButtonBuilder().setCustomId('❤️').setLabel('❤️').setStyle(ButtonStyle.Secondary))
      .addComponents(new ButtonBuilder().setCustomId('🧡').setLabel('🧡').setStyle(ButtonStyle.Secondary))
      .addComponents(new ButtonBuilder().setCustomId('💛').setLabel('💛').setStyle(ButtonStyle.Secondary));

    const button2 = new ActionRowBuilder()
      .addComponents(new ButtonBuilder().setCustomId('💚').setLabel('💚').setStyle(ButtonStyle.Secondary))
      .addComponents(new ButtonBuilder().setCustomId('💙').setLabel('💙').setStyle(ButtonStyle.Secondary))
      .addComponents(new ButtonBuilder().setCustomId('💜').setLabel('💜').setStyle(ButtonStyle.Secondary));

    const msgTarot = await msg.channel.send({
      embeds: [tarotEditedEmbed],
      components: [button1 as any, button2 as any]
    });

    //타로하트 선택 후 결과 창
    const filter = (i: any) => {
      return i.user.id === msg.author.id;
    };
    const collector = msgTarot.createMessageComponentCollector({ filter, time: 60000 });
    collector.on('collect', async (i: any) => {
      let strDes = '',
        strField = new Array(3);

      switch (i.customId) {
        case '❤️':
          strDes = '빨간색 하트를 고른 당신!';
          strField = script[0];
          break;
        case '🧡':
          strDes = '주황색 하트를 고른 당신!';
          strField = script[1];
          break;
        case '💛':
          strDes = '노란색 하트를 고른 당신!';
          strField = script[2];
          break;
        case '💚':
          strDes = '초록색 하트를 고른 당신!';
          strField = script[3];
          break;
        case '💙':
          strDes = '파란색 하트를 고른 당신!';
          strField = script[4];
          break;
        case '💜':
          strDes = '보라색 하트를 고른 당신!';
          strField = script[5];
          break;
        default:
          strDes = '그 밖에 다른 선택지를 들고 온 당신!';
          strField = [
            '숲튽훈',
            'https://i.imgur.com/IhkTEvP.png',
            '지금 반항하시는 건가요? 그런 당신에겐 숲튽훈의 저주를 내려 드리죠.'
          ];
          break;
      }

      const tarotEmbed = {
        color: 0xf7cac9,
        author: {
          name: '민둘봇의 타로 하트',
          icon_url: 'https://i.imgur.com/AD91Z6z.jpg'
        },
        description: `${strDes}`,
        fields: [{ name: `오늘은 **${strField[0]}**이에요`, value: strField[2] }],
        image: { url: strField[1] }, //url말고 다른 방법이 없을까
        footer: {
          text: `모든 설명은 심리학 이론인 바넘효과를 바탕으로 작성되었습니다.`,
          icon_url: 'https://i.imgur.com/AD91Z6z.jpg'
        }
      };
      i.update({ embeds: [tarotEmbed], components: [] });
    });

    return msgTarot;
  }
};
