//타로하트 생성과정
async function firstStep(msg){
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

//타로하트 선택 후 결과 창
async function secondStep(reaction, user){
    let strDes="", strField=new Array[3];

    const tarot=require("./TarotList");
    const arr=tarot.script;
            
    reaction.users.remove(user);
    switch(reaction.emoji.name){
        case "❤️": strDes="빨간색 하트를 고른 당신!"; strField=arr[0]; break;
        case "🧡": strDes="주황색 하트를 고른 당신!"; strField=arr[1]; break;
        case "💛": strDes="노란색 하트를 고른 당신!"; strField=arr[2]; break;
        case "💚": strDes="초록색 하트를 고른 당신!"; strField=arr[3]; break;
        case "💙": strDes="파란색 하트를 고른 당신!"; strField=arr[4]; break;
        case "💜": strDes="보라색 하트를 고른 당신!"; strField=arr[5]; break;
    }

    const tarotEmbed = {
        color: 0xF7CAC9,
        author: {
            name: '민둘봇의 타로 하트',
            icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
        },
        description: `${strDes}`,
        fields:[{name: `오늘은 **${strField[0]}**이에요`, value: strField[2]}],
        image: {url: strField[1]},
        footer: {
            text: `모든 설명은 심리학 이론인 바넘효과를 바탕으로 작성되었습니다.`,
            icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
        },
    };
    return tarotEmbed;
}

//타로 카드 셔플
func=require("./../../func.js");
setImmediate(()=>{
    func.shuffle(require("./TarotList.js").script);
    setInterval(()=>{
        if(moment().hour()==0)
            func.shuffle(require("./TarotList.js").script);
    },60*60*1000)//1시간
});

module.exports={firstStep, secondStep};
