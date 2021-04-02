const moment = require('moment');

const gameList = {
    color: 0xF7CAC9,
    author: {
        name: '민둘봇 게임 선택창',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
        url: 'https://www.youtube.com/channel/UCNqyvS8P82pGJ_4YyHIl7Zw',
    },
    description: '최초로 실행하시는 분은 해당 임베드에서부터 시작합니다. 원하시는 게임을 선택하세요~',
    fields: [
        {
            name: '1. gameTest1',
            value: 'test1 게임입니다. \n난이도 : ★☆☆☆☆',
            inline: false,
        },
        {
            name: '2. gameTest2',
            value: 'test2 게임입니다. \n난이도 : ★★★☆☆',
            inline: false,
        },
    ],
    timestamp: moment(),
    footer: {
        text: 'instagram @mindul_mendul ',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
    },
};
exports.gameList=gameList;