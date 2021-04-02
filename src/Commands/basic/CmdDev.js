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
            name: 'Data Base',
            value: '민둘봇이 데이터베이스를 가지고 데이터를 수집하려고 해요. 민감한 정보는 묻지도 않고, 필요하지도 않아요. 이건 그저 개발자 입장에서 시도하는 거라 도입이 되어도 사용자분들에게는 큰 영향을 끼치지 않을 겁니다.',
            inline: false,
        },
        {
            name: '텍스트 게임',
            value: '민둘봇에 들어갈 첫 번째 게임이라고 생각해요. 디코봇에 게임을 집어넣는 경우도 있다고 들어서 시도하는 거에요. 만약 등장한다면 DB기능을 사용한 최초의 기능이 되겠네요. 좋은 게임이 될지는 지금 장담 못합니다^^',
            inline: false,
        },
        {
            name: '미니게임',
            value: '미니게임 모음으로도 한 번 만들어보려고요. 실제 디코봇에 등장하는 게임들은 대게 러시안룰렛과 같은 간단한 게임이더라고요. 시스템은 텍스트 게임과 크게 다르지 않게 만들어보렵니다.',
            inline: false,
        },
        {
            name: '배틀리버스 ai',
            value: '이건 특별히 개발해보고 싶었던 거에요! 이밖에도 ai로의 개선 여지가 있는 건 모두 해볼 생각입니다.',
            inline: false,
        },
        {
            name: '주식투자',
            value: '개발될지는 절대 모르는 기능입니다. 개발 기간이 오래걸릴 것 같기도 하고요. 이 기능이 개발되는 경우, 실투자라기보다는 그냥 ai주식투자 관련 정보 제공으로 사용하려는 거라 사실 디코봇의 기능과는 상관이 없을 겁니다.',
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