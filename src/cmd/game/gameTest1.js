var mapInfo = new Map();
const moment = require('moment');
const gameData = require('./gameData.js');

function createAPI(msg){
    mapInfo.set(msg.member.id,
        {
            stage: 0,
            quest: gameQuest,
            answer: "",
        }
    )
    return mapInfo.get(msg.member.id);
}

function getAPI(msg) {return mapInfo.get(msg.member.id);}

async function refreshQuest(msg, num){
    if(mapInfo.get(msg.member.id).quest.fields!=[]) await mapInfo.get(msg.member.id).quest.fields.pop();
    await mapInfo.get(msg.member.id).quest.fields.push(scriptArray[num]);
    mapInfo.get(msg.member.id).answer=answerArray[num];
}

module.exports={createAPI, getAPI, refreshQuest};

const gameQuest = {
    color: 0xF7CAC9,
    author: {
        name: 'gameTest1',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
        url: 'https://www.youtube.com/channel/UCNqyvS8P82pGJ_4YyHIl7Zw',
    },
    description: '텍스트를 모두 읽고 주어진 문제에 대한 답을 입력해주세요.',
    fields: [],
    timestamp: moment(),
    footer: {
        text: 'instagram @mindul_mendul',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
    },
};

const answerArray=[//정답지
    "ans",//1
    "asdf",//2
]

const scriptArray=[//문제지
    {
        name: '스테이지 1',
        value: '정답은 "ans"입니다. 그대로 입력해주세요.',
        inline: false,
    },
    {
        name: '스테이지 2',
        value: '정답은 "asdf"입니다. 그대로 입력해주세요.',
        inline: false,
    },
];