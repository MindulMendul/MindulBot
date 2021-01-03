require('dotenv').config();

const { Client } = require('discord.js');
const mormotte = new Client();

const MORMOTTE_ID="751773063766343721";
const PREFIX="ㅓ";

mormotte.on('ready', () => {
    console.log(`${mormotte.user.tag} has logged in.`);
});

mormotte.on('message', (msg) => {
    if(msg.channel.type=="dm"){ // 디엠 명령어는 안받아 ㅅㄱ~
        if(msg.author.tag=="KyuJin#8927"){
            msg.channel.send("아잉좋아~");
        } else if(msg.author.tag=="박민규#7504"){
            msg.channel.send("아잉싫어~");
        } else if(msg.author != mormotte.user) {
            msg.channel.send("DM은 명령어 안통함 ㅅㄱ");
            return;
        }
    }
    msg.content.toLowerCase();
    if(msg.content.startsWith(PREFIX)){//명령어 어두 감지
        const [CMD_NAME, ...args] = msg.content//문장 정리
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

        switch(CMD_NAME){
            case '야':
                msg.channel.send('왜');
            break;

            case '아잉':
                msg.channel.send('아잉 좋아~');
            break;
            case "도움말":
            case "ㄷㅇㅁ":
            case "help":
                const exampleEmbed = {
                    color: 0x0099ff,
                    title: '도움말',
                    url: 'https://www.youtube.com/channel/UCNqyvS8P82pGJ_4YyHIl7Zw',
                    author: {
                    name: '민둘봇의 명령어 안내',
                        icon_url: 'https://i.imgur.com/wSTFkRM.png',
                        url: 'https://www.youtube.com/channel/UCNqyvS8P82pGJ_4YyHIl7Zw',
                    },
                    description: '명령어는 이런 것들이 있어요. 명령어 전에는 한글로 "ㅓ" 를 입력하세요!',
                    /*thumbnail: {
                        url: 'https://i.imgur.com/wSTFkRM.png',
                    },*/
                    fields: [
                        {
                            name: '야',
                            value: '왜',
                            inline: false,
                        },
                        {
                            name: '아잉',
                            value: '좋다고 호응해줘요~',
                            inline: false,
                        },
                    ],
                    /*image: {
                        url: 'https://i.imgur.com/wSTFkRM.png',
                    },
                    timestamp: new Date(),
                    footer: {
                        text: 'Some footer text here',
                        icon_url: 'https://i.imgur.com/wSTFkRM.png',
                    },*/
                };
                
                msg.channel.send({ embed: exampleEmbed });
            break;
        }
    }
});


mormotte.login(process.env.MORMOTTE_TOKEN);