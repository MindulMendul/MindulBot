const {PREFIX} = require("../../../GlobalVariable.js");
const moment = require('moment');

const helpembed = {
    color: 0xF7CAC9,
    author: {
        name: '민둘봇의 명령어 안내',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
        url: 'https://www.youtube.com/channel/UCNqyvS8P82pGJ_4YyHIl7Zw',
    },
    description: '명령어는 이런 것들이 있어요.\n 명령어 전에는 "' + PREFIX + '" 를 입력하세요!',
    fields: [
        {
            name: 'ping',
            value: 'pong으로 대답해요',
            inline: false,
        },
        {
            name: '민둘',
            value: '"민둘이는 바보"로 대답해요.\n그런데 화내면 앞에 말했던 것들을 수정해요. (숨은 명령어)',
            inline: true,
        },
        {
            name: '맨둘',
            value: '"맨둘이는 집나갔음."으로 대답해요',
            inline: true,
        },
        {
            name: '얍',
            value: '얍으로 대답해요.',
            inline: false,
        },
        {
            name: '시간',
            value: '시간을 대답해요.',
            inline: true,
        },
        {
            name: '날짜',
            value: '날짜를 대답ㅎ',
            inline: true,
        },
        {
            name: '나가',
            value: '민둘봇이 방을 나가요.',
            inline: false,
        },
        {
            name: '타로',
            value: '오늘의 운세를 봐줘요!',
            inline: true,
        },
    ],
    timestamp: moment(),
    footer: {
        text: 'instagram @mindul_mendul ',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
    },
};
exports.helpEmbed=helpembed;