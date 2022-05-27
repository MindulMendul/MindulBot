import moment from 'moment';
import { cmd } from '../../type';

export const basicHelp: cmd = {
    name: `도움말`,
    cmd: ['도움말', 'ㄷㅇㅁ', 'help'],
    type: 'basic',
    permission: [],
    execute(msg) {
        const helpembed: any = {
            color: 0xf7cac9,
            author: {
                name: '민둘봇의 명령어 안내',
                iconURL: 'https://i.imgur.com/AD91Z6z.jpg',
                url: 'https://www.youtube.com/channel/UCNqyvS8P82pGJ_4YyHIl7Zw'
            },
            description:
                `명령어는 이런 것들이 있어요.\n 명령어 전에는 "한글 '${process.env.PREFIX}' 를 입력하세요! ` +
                `${process.env.PREFIX}와 명령어 사이에 띄어쓰기를 하면 인식하지 못하니 반드시 붙여서 사용하세요. ` +
                '노래명령어를 원하신다면 따로 "ㅣ노래도움말" 명령어로 제공하고 있으니 참고 바랍니다^^ ' +
                '\n(해당 문서는 2022년 01월 13일에 업데이트되었습니다.) ',
            fields: [
                {
                    name: '민둘',
                    value: '민둘이에 대해서 대답해요.\n그런데 화내면 앞에 말했던 것들을 수정해요. (숨은 명령어)',
                    inline: true
                },
                {
                    name: '맨둘',
                    value: '"맨둘이에 대해서 대답해요',
                    inline: true
                },
                {
                    name: '민둘맨둘',
                    value: '민둘이랑 맨둘이의 사이를 얘기해줘요.',
                    inline: false
                },
                {
                    name: '시간',
                    value: '시간을 대답해요.',
                    inline: true
                },
                {
                    name: '날짜',
                    value: '날짜를 대답ㅎ',
                    inline: true
                },
                {
                    name: '주사위',
                    value: '1부터 6까지 정수 중에 하나를 말해줘요!',
                    inline: true
                },
                {
                    name: '타로',
                    value: '오늘의 운세를 봐줘요.',
                    inline: false
                },
                {
                    name: '건의',
                    value: '민둘봇에게 말하고 싶은 게 있으면 건의해주세요. 의견 참고해서 반영할 수 있도록 하겠습니다 ㅎㅎ',
                    inline: false
                }
            ],
            timestamp: moment().date(),
            footer: {
                text: 'instagram @mindul_mendul ',
                iconURL: 'https://i.imgur.com/AD91Z6z.jpg'
            }
        };
        return msg.channel.send({ embeds: [helpembed] });
    }
};
