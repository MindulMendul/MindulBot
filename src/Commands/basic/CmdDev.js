const moment = require('moment');

const devembed = {
    color: 0xF7CAC9,
    author: {
        name: '민둘봇의 앞으로 개발될 기능 안내',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
    },
    description: '민둘봇의 앞으로 추가될 기능에 대해 안내하는 임베드입니다. '+
    '무조건 개발된다는 건 아니고, 언제든지 사라질 수 있음을 함께 안내해드릴게요~ '+
    '현재 개발과정은 소야봇을 전적으로 벤치마킹하고 있으며, '+
    '소야봇 개발자께서도 알고 계시다는 것까지 알려드립니다!',
    fields: [
        {
            name: '노래봇 기능',
            value: '노래봇 기능들을 전부 때려박아볼 계획이에요!(곧 개발완료입니다 ㅎㅎ)',
            inline: false,
        },
        {
            name: '메이플봇 기능',
            value: '메이플봇으로써 필요한 기능들이 뭐가 있을지 생각하는 중이에요.',
            inline: false,
        },
        {
            name: '배틀리버스 ai 기능',
            value: '이건 특별히 개발해보고 싶었던 거에요! 이밖에도 ai로의 개선 여지가 있는 건 모두 해볼 생각입니다.',
            inline: false,
        },
        {
            name: '릴레이소설(?) 기능',
            value: '민둘봇에 들어갈 첫 번째 게임이라고 생각해요. 디코봇에 게임을 집어넣는 경우도 있다고 들었어요!',
            inline: false,
        },
    ],
    timestamp: moment(),
    footer: {
        text: 'instagram @mindul_mendul ',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
    },
};
exports.devEmbed=devembed;