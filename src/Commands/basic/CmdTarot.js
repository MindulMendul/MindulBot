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

const script=[
    ["신나는 날",                  //1
    "https://i.imgur.com/Wxw0Ifa.png",
    "카드의 그림처럼, 오늘은 돼지와 함께 춤을 추고 싶을 정도로 신나는 날이 될 거에요. 신나는 날이니까 신나게 놀아보자고요~ 일해야 한다면 폰놀이도 괜찮아요."],

    ["좋은 날",                    //2
    "https://i.imgur.com/RwNFxvB.png",
    "그림에 등장하는 사람들은 마냥 좋은 것보다는 마치 마약을 한 사람들처럼 몸이 풀려있지만... 킹무튼 좋은 날이에요. 아이유 노래 좋아하시면 [좋은 날](https://www.youtube.com/watch?v=jeqdYqsrsA0)도 들어보세요. 물론 그렇다고 제가 아이유 팬이라든가 그런 건 아니에요."],

    ["그럭저럭인 날",               //3
    "https://i.imgur.com/AXEsNhE.png",
    "그림을 보면 무슨 생각이 드시나요? 아무 생각이 없어보인다고요? 그럼 그냥 그럭저럭 넘어가세요. 나쁜 의미는 아니고, 그냥 그럭저럭 괜찮은 날이라는 의미에요."],

    ["행복한 날",                  //4
    "https://i.imgur.com/M2ffk30.png",
    "그림을 봐도 글을 읽어도, 도대체 누가 행복한 건진 알 수가 없어요. 모두 행복한 사람들이거든요. 그러니 걱정마세요, 당신과 함께라면 누구라도 행복할 것 같아요. 제가 그 증인이 되어줄게요."],

    ["모든 일이 재밌는 날",         //5
    "https://i.imgur.com/UTSRmVT.png",
    "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"],

    ["가슴이 두근대는 날",          //6
    "https://i.imgur.com/kGb3unb.png",
    "심장병이 있거나 한 건 아니에요. 오늘은 어떤 행운이 따를지 기대해보자고요! 생각만 해도 벌써부터 가슴이 두근두근 거리지 않나요?"],

    ["조심해야 하는 날",            //7
    "https://i.imgur.com/zNV3zaG.png",
    "뭐든 조심해서 나쁠 건 없죠~ 세상에 신중해야 하는 게 얼마나 많은데요. 당신은 분명 모든 일을 다 잘 해내리라 믿어요!"],

    ["기분 좋은 날",               //8
    "https://i.imgur.com/ClHvecJ.png",
    "저는 ㄹㅇㅋㅋ만 칠게요~ 기분이 안좋으면 어때요? 금방 회복하고 좋아질 거라 저는 믿어 의심치 않아요!"],

    ["웃긴 일이 가득한 날",         //9
    "https://i.imgur.com/GJJ4Z9S.png",
    "낙엽만 굴러가도 웃길 거에요~ 웃으면 복이 온다는데, 오늘은 얼마나 큰 복이 굴러들어올지 기대가 되네요~"],

    ["조용히 지나가야 하는 날",     //10
    "https://i.imgur.com/bzVojAk.png",
    "하지만 소리내야 할 때는 내야 하는 날이기도 해요. 사실 소리의 크기는 상관없는 것 같다고 생각해요."],

    ["멋진 날",                     //11
    "https://i.imgur.com/forNp1u.png",
    "언제 말해도 당신은 항상 멋진 사람인 걸요! 어떤 하루를 보내도 멋진 하루가 되어있을 거에요."],

    ["하루가 정말 기대되는 날",     //12
    "https://i.imgur.com/B5GEAr5.png",
    "설사 오늘이 월요일이라도 문제 없어요 ㅎㅎ 아니면 말고요. 이런 글을 작성하는 저도 월요일은 무서워요."],
];


module.exports={firstStep, script};