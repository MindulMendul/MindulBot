const {PREFIX} = require("../../../GlobalVariable.js");
const moment = require('moment');

const helpembed = {
    color: 0xF7CAC9,
    author: {
        name: '민둘봇의 노래 명령어 안내',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
        url: 'https://www.youtube.com/channel/UCNqyvS8P82pGJ_4YyHIl7Zw',
    },
    description: `명령어는 이런 것들이 있어요.\n 명령어 전에는 "${PREFIX}" 를 입력하세요! 모든 노래봇 기능은 유튜브 노래를 기준으로 재생합니다. 개발자가 멍청해서 오랜 시간을 들였음에도 상당히 불안정한 기능들입니다. 버그가 생겨도 고치기까지는 시간이 걸릴테니 양해부탁드려요 ㅠㅠ`,
    fields: [
        {
            name: '노래',
            value: '유튜브 주소를 입력하면 돼요! 귀찮다면 그냥 듣고 싶은 노래 제목만 치면 직접 검색해서 제일 위에 있는 노래로 틀어요.',
            inline: false,
        },
        {
            name: '검색',
            value: '노래 명령어의 검색기능 확장형이에요. 유튜브에 검색한 것과 동일한 목록을 보여줍니다. 그 후에 숫자를 입력하면 그에 해당하는 노래도 틀어드려요!(가끔 여기에 선택된 노래가 아니라 다른 영상이 틀어지는 버그가 있다는 걸 확인했습니다. 빠른 시일내에 고칠게요, 죄송합니다 ㅠㅠ)',
            inline: false,
        },
        {
            name: '스킵',
            value: '재생 중인 노래를 넘기고 다음 노래로 넘어갑니다. 넘어간 노래는 다시 주워담을 수 없어요!',
            inline: false,
        },
        {
            name: '멈춤(해당 명령어는 수정 예정이에요.)',
            value: '노래를 일시정지하는 기능이 아니에요 ㅠㅠ 그냥 노래 목록을 다 날려버립니다.',
            inline: false,
        },
        {
            name: '삭제',
            value: '노래 목록에서 빼고 싶은 녀석을 빼는 기능이에요. 역시 검색 명령어처럼 숫자를 입력하시면 됩니다.',
            inline: false,
        },
        {
            name: '노래목록',
            value: '현재 재생 중인 노래와 대기중인 노래의 목록을 보여줍니다.',
            inline: false,
        },
        
    ],
    timestamp: moment(),
    footer: {
        text: 'instagram @mindul_mendul ',
        icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
    },
};
exports.helpEmbed=helpembed;