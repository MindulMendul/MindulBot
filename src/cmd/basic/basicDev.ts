<<<<<<< HEAD
import { CMD } from '../../types/type';

export const basicDev: CMD = {
  name: `개발`,
  cmd: ['개발', 'ㄱㅂ', '개발일정', 'ㄱㅂㅇㅈ', 'dev'],
  type: 'basic',
  permission: [],
  execute(msg) {
    const moment = require('moment');

    const devembed = {
      color: 0xf7cac9,
      author: {
        name: '민둘봇 개발 목표 안내',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg'
      },
      description:
        '민둘봇이 앞으로 어떻게 개발될지 안내하는 임베드입니다. ' +
        '해당 문서에는 앞으로 개발될 기능과, 현재 기능들 중에 제가 중점을 두고 고치고 있는 부분을 코멘트해두었습니다. ' +
        '무조건 개발된다는 건 아니고, 해당 문구들이 언제든지 사라질 수 있음을 함께 안내해드릴게요~ ' +
        '(소야봇 개발자님, 여러 도움을 주셔서 진심으로 감사드립니다.) ' +
        '\n(해당 문서는 2022년 01월 13일에 업데이트되었습니다.) ',
      fields: [
        {
          name: '텍스트 게임',
          value:
            '민둘봇에 들어갈 첫 번째 게임이라고 생각해요. 디코봇에 게임을 집어넣는 경우도 있다고 들어서 시도하는 거에요. 떠오르는 아이디어가 없어서, 좋은 게임이 될지는 지금 장담 못합니다^^',
          inline: false
        },
        {
          name: '퀴즈 게임',
          value:
            '얼마 전, 퀴즈 이벤트를 진행하려고 만든 퀴즈봇을 이식하고자 해요! OX 퀴즈로 진행할 예정이고, 그 밖에 어떻게 개발할 것인지는 생각해보지 않았습니다!',
          inline: false
        },
        {
          name: '밸런스 게임',
          value:
            '이것 역시 재미난 기능이 될 것 같아요! 전 당신들이 똥맛 카레를 선호하는지, 아니면 카레맛 똥을 선호하는지 궁금합니다!',
          inline: false
        }
      ],
      timestamp: moment(),
      footer: {
        text: 'instagram @mindul_mendul ',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg'
      }
    };
    return msg.channel.send({ embeds: [devembed] });
  }
};
=======
import { cmd } from "../../type";

export const basicDev: cmd = {
    name: `개발`,
    cmd: ["개발", "ㄱㅂ", "개발일정", "ㄱㅂㅇㅈ", "dev"],
    type: "basic",
    permission: [],
    execute(msg) {
        const moment = require('moment');

        const devembed = {
            color: 0xF7CAC9,
            author: {
                name: '민둘봇 개발 목표 안내',
                icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
            },
            description: '민둘봇이 앞으로 어떻게 개발될지 안내하는 임베드입니다. ' +
                '해당 문서에는 앞으로 개발될 기능과, 현재 기능들 중에 제가 중점을 두고 고치고 있는 부분을 코멘트해두었습니다. ' +
                '무조건 개발된다는 건 아니고, 해당 문구들이 언제든지 사라질 수 있음을 함께 안내해드릴게요~ ' +
                '(소야봇 개발자님, 여러 도움을 주셔서 진심으로 감사드립니다.) ' +
                '\n(해당 문서는 2022년 01월 13일에 업데이트되었습니다.) ',
            fields: [
                {
                    name: '텍스트 게임',
                    value: '민둘봇에 들어갈 첫 번째 게임이라고 생각해요. 디코봇에 게임을 집어넣는 경우도 있다고 들어서 시도하는 거에요. 떠오르는 아이디어가 없어서, 좋은 게임이 될지는 지금 장담 못합니다^^',
                    inline: false,
                },
                {
                    name: '퀴즈 게임',
                    value: '얼마 전, 퀴즈 이벤트를 진행하려고 만든 퀴즈봇을 이식하고자 해요! OX 퀴즈로 진행할 예정이고, 그 밖에 어떻게 개발할 것인지는 생각해보지 않았습니다!',
                    inline: false,
                },
                {
                    name: '밸런스 게임',
                    value: '이것 역시 재미난 기능이 될 것 같아요! 전 당신들이 똥맛 카레를 선호하는지, 아니면 카레맛 똥을 선호하는지 궁금합니다!',
                    inline: false,
                }
            ],
            timestamp: moment(),
            footer: {
                text: 'instagram @mindul_mendul ',
                icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
            },
        };
        return msg.channel.send({ embeds: [devembed] });
    }
};
>>>>>>> 0aba8f5e (basic 명령어 모두 실행가능하도록 변경)
