module.exports = {
	name: `타로`,
	cmd: ["타로","ㅌㄹ","운세","오늘의운세"],
    type:"basic",
    permission: ["ADD_REACTIONS","MANAGE_EMOJIS"],
    //타로하트 생성과정
    async execute(msg){
        const tarotEmbed = {
            color: 0xF7CAC9,
            author: {
                name: '민둘봇의 타로 하트',
                icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
            },
            description: '타로 하트를 생성 중입니다.. 잠시만 기다려주세요~',
        };

        const tarotEditedEmbed = {
            color: 0xF7CAC9,
            author: {
                name: '민둘봇의 타로 하트',
                icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
            },
            description: '6개의 이모지로 입력된 하트를 하나만 아무거나 선택해 주세요!',
        };
        
        const asdf=await msg.channel.send({embed: tarotEmbed});//하트 만드는 과정
        asdf.react("❤️");
        asdf.react("🧡");
        asdf.react("💛");
        asdf.react("💚");
        asdf.react("💙");
        await asdf.react("💜");
        asdf.edit({embed: tarotEditedEmbed});

        this.react(asdf, msg);
    },
    //타로하트 선택 후 결과 창
    async react(asdf, msg){
        const reactionFilter = (reaction, user) => {return (user.id==msg.author.id);}
        const collector = asdf.createReactionCollector(reactionFilter, {maxEmojis:1});
        collector.on('collect', (reaction, user) => {
            if(reaction.message!=asdf) return;
            let strDes="", strField=new Array(3);
            
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
                default:
                    strDes="그 밖에 다른 선택지를 들고 온 당신!";
                    strField=["숲튽훈",
                    "https://i.imgur.com/IhkTEvP.png",
                    "지금 반항하시는 건가요? 그런 당신에겐 숲튽훈의 저주를 내려 드리죠."];
                break;
            }
            
            const tarotEmbed = {
                color: 0xF7CAC9,
                author: {
                    name: '민둘봇의 타로 하트',
                    icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
                },
                description: `${strDes}`,
                fields:[{name: `오늘은 **${strField[0]}**이에요`, value: strField[2]}],
                image: {url: strField[1]},//url말고 다른 방법이 없을까
                footer: {
                    text: `모든 설명은 심리학 이론인 바넘효과를 바탕으로 작성되었습니다.`,
                    icon_url: 'https://i.imgur.com/AD91Z6z.jpg',
                },
            };
            asdf.edit({embed: tarotEmbed});
        });
    }
};
