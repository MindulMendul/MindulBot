async function firstStep(msg){
    const tarotEmbed = {
        color: 0xF7CAC9,
        author: {
            name: '민둘봇의 타로 하트',
            icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
            url: 'https://www.youtube.com/channel/UCNqyvS8P82pGJ_4YyHIl7Zw',
        },
        image:"./../../TarotCard.png",
        description: '타로 하트를 생성 중입니다.. 잠시만 기다려주세요~',
    };

    const tarotEditedEmbed = {
        color: 0xF7CAC9,
        author: {
            name: '민둘봇의 타로 하트',
            icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
            url: 'https://www.youtube.com/channel/UCNqyvS8P82pGJ_4YyHIl7Zw',
        },
        image:"./../../TarotCard.png",
        description: '6개의 이모지로 입력된 하트를 하나만 아무거나 선택해 주세요!',
    };
    
    const asdf=await msg.channel.send({embed: tarotEmbed})
        .then(async msg1=>{
              await msg1.react("❤️");
              await msg1.react("🧡");
              await msg1.react("💛");
              await msg1.react("💚");
              await msg1.react("💙");
              await msg1.react("💜");
              await msg1.edit({embed: tarotEditedEmbed});

              return msg1;
    });
    return asdf;
}

const script=[
    "오늘은 **신나는 날**이에요!\n돼지와 함께 춤을 추고 싶을 거에요.",

    "오늘은 **좋은 날**이에요!\n킹무튼 좋은 날이에요.",

    "오늘은 **그럭저럭인 날**이에요!\n그러니까 그럭저럭 넘어가세요.",

    "오늘은 **행복한 날**이에요!\n누가 행복한 건진 알 수가 없어요.",

    "오늘은 **모든 일이 재밌는 날**이에요!\nㅋㅋㅋㅋㅋㅋㅋㅋ",

    "오늘은 **가슴이 두근대는 날**이에요!\n심장병이 있거나 한 건 아니에요."
];


module.exports={firstStep, script};
