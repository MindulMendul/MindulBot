import { EmbedBuilder, PermissionsBitField } from 'discord.js';
import { PREFIX } from '../../configs/env';
import { CMD } from '../../types/type';

export const basicHelp: CMD = {
  name: `도움말`,
  cmd: ['도움말', 'ㄷㅇㅁ', 'help'],
  type: 'basic',
  permission: [PermissionsBitField.Flags.SendMessages],
  async execute(msg) {
    return new Promise(async (resolve, reject) => {
      try {
        const helpembed = new EmbedBuilder({
          color: 0xf7cac9,
          author: {
            name: '민둘봇의 명령어 안내',
            icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
            url: 'https://www.youtube.com/channel/UCNqyvS8P82pGJ_4YyHIl7Zw'
          },
          description:
            `명령어는 이런 것들이 있어요.\n 명령어 전에는 "한글 '${PREFIX}' 를 입력하세요! ` +
            `${PREFIX}와 명령어 사이에 띄어쓰기를 하면 인식하지 못하니 반드시 붙여서 사용하세요. ` +
            `노래명령어를 원하신다면 따로 "${PREFIX}노래도움말" 명령어로 제공하고 있으니 참고 바랍니다^^ ` +
            '\n(해당 문서는 2023년 05월 26일에 업데이트되었습니다.) ',
          fields: [
            {
              name: '민둘',
              value: '민둘이에 대해서 대답해요.\n그런데 화내면 앞에 말했던 것들을 수정해요. (숨은 명령어)',
              inline: false
            },
            {
              name: '주사위',
              value: '1부터 6까지 정수 중에 하나를 말해줘요!',
              inline: false
            },
            {
              name: '타로',
              value: '오늘의 운세를 봐줘요.',
              inline: false
            },
            // {
            //   name: 'TTS',
            //   value: '민둘봇이 말을 해줘요! 디코 기본 기능에 TTS기능이 있는 건 알지만, 그래도 구현해보고 싶었다고요~',
            //   inline: false
            // },
            {
              name: '건의',
              value: '민둘봇에게 말하고 싶은 게 있으면 건의해주세요. 의견 참고해서 반영할 수 있도록 하겠습니다 ㅎㅎ',
              inline: false
            }
          ]
        });
        await msg.channel.send({ embeds: [helpembed] });
        resolve(undefined);
        return;
      } catch (error) {
        reject(error);
      }
    });
  }
};
