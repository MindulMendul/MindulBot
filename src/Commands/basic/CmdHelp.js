<<<<<<< HEAD:src/Commands/basic/CommandHelp.js
<<<<<<<< HEAD:help.js
const helpEmbed = {
========
const {PREFIX} = require("./../../../GlobalVariable.js");
=======
const {PREFIX} = require("../../../GlobalVariable.js");
>>>>>>> ca3e669c (노래봇 추가(기능에 문제가 있어서 지금 올라가는 것에는 주석 처리)):src/Commands/basic/CmdHelp.js
const moment = require('moment');

const helpembed = {
>>>>>>>> d1b3cbb3 (펀치킹 알림기능 완성!):src/Commands/basic/CommandHelp.js
    color: 0xF7CAC9,
    author: {
        name: '민둘봇의 명령어 안내',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
        url: 'https://www.youtube.com/channel/UCNqyvS8P82pGJ_4YyHIl7Zw',
    },
    description: '명령어는 이런 것들이 있어요.\n 명령어 전에는 "' + PREFIX + '" 를 입력하세요! 노래명령어를 원하신다면 따로 "ㅣ노래도움말" 명령어로 제공하고 있으니 참고 바랍니다^^',
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
            inline: false,
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
            inline: false,
        },
        {
            name: '나가',
            value: '민둘봇이 방을 나가요.',
            inline: false,
        },
        {
            name: '타로',
            value: '오늘의 운세를 봐줘요!',
            inline: false,
        },
        {
            name: '건의',
            value: '민둘봇에 말하고 싶은 게 있으면 건의해주세요. 의견 참고해서 반영할 수 있도록 하겠습니다 ㅎㅎ',
            inline: false,
        },
    ],
    timestamp: new Date(),
    footer: {
        text: 'instagram @mindul_mendul ',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
    },
};