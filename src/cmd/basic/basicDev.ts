import { EmbedBuilder } from 'discord.js';
import { CMD } from '../../types/type';

export const basicDev: CMD = {
  name: `개발`,
  cmd: ['개발', 'ㄱㅂ', '개발일정', 'ㄱㅂㅇㅈ', 'dev'],
  type: 'basic',
  permission: [],
  async execute(msg) {
    return new Promise(async (resolve, reject)=>{
      const devembed = new EmbedBuilder({
        color: 0xf7cac9,
        author: {
          name: '민둘봇 개발 목표 안내',
          icon_url: 'https://i.imgur.com/AD91Z6z.jpg'
        },
        description:
          '민둘봇이 앞으로 어떻게 개발될지 안내하는 임베드입니다. ' +
          '해당 문서에는 앞으로 개발될 기능과, 현재 기능들 중에 제가 중점을 두고 고치고 있는 부분을 코멘트해두었습니다. ' +
          '무조건 개발된다는 건 아니고, 해당 문구들이 언제든지 사라질 수 있음을 함께 안내해드릴게요~ ' +
          '\n(해당 문서는 2022년 05월 26일에 업데이트되었습니다.) ',
        fields: [
          {
            name: '밸런스 게임',
            value:
              '이것 역시 재미난 기능이 될 것 같아요! 전 당신들이 똥맛 카레를 선호하는지, 아니면 카레맛 똥을 선호하는지 궁금합니다!',
            inline: false
          },
          {
            name: '챗 지피티',
            value:
              '요즘 핫한 챗 지피티를 이식해서 사용하면 재밌을 거라 생각해요. 한 번 조사해보려고요!',
            inline: false
          }
        ]
      });

      await msg.channel.send({ embeds: [devembed] });
      resolve(undefined); return;
    });
  }
};
