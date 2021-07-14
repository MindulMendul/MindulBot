async function firstStep(msg, embed){
    const tarotEmbed = {
        color: 0xF7CAC9,
        author: {
            name: '민둘봇의 타로 하트',
            icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
        },
        image:"./TarotCard.png",
        description: '타로 하트를 생성 중입니다.. 잠시만 기다려주세요~',
    };

    const tarotEditedEmbed = {
        color: 0xF7CAC9,
        author: {
            name: '민둘봇의 타로 하트',
            icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
        },
        image:"./TarotCard.png",
        description: '6개의 이모지로 입력된 하트를 하나만 아무거나 선택해 주세요!',
    };
    
    const asdf = await msg.channel.send({embed: tarotEmbed})
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

//타로 카드 셔플
const func=require("./../../func.js");
setImmediate(()=>{
    func.shuffle(require("./TarotList.js").script);
    setInterval(()=>{
        if(moment().hour()==0)
            func.shuffle(require("./TarotList.js").script);
    },60*60*1000)//1시간
});

module.exports={firstStep};
