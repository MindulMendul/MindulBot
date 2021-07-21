const ytdl=require("ytdl-core"); //유튜브 노래 틀어주는 거
const musicQueue = new Map();//큐 담아두는 곳

//크롤링때 쓰는 거
const axios = require("axios");
const cheerio = require("cheerio");

let scheduling=undefined;

//유튜브찾기 함수
async function searchYoutubeList(question, limit){
    const getHtml = async () => {
        try {
            return axios.get(`https://www.youtube.com/results?search_query=${encodeURI(question)}&sp=EgIQAQ%253D%253D`);
            // axios.get 함수를 이용하여 비동기로 유튜브 html 파일을 가져온다.
        } catch (err) {
            console.error(err);
        }
    };

    let List = [];
    const html=await getHtml();
    const $ = cheerio.load(html.data);
    
    const $bodyList = $("body");
    let txt="", tmpIndex=0, count=limit;
    
    $bodyList.children().each( function(i) {
        if(i==15){//여기에 제목이랑 주소 담겨있음. 이건 내가 하나하나 찾은 거라 변경 ㄴㄴ... 제발 ㅠㅠ
            txt=$(this).html();
            while(txt.indexOf('"watchEndpoint":{"videoId":"')>0 && count>0){
                tmpIndex=txt.indexOf('"watchEndpoint":{"videoId":"');//url 앞 키워드
                List.push({
                    title: txt.slice(txt.indexOf('"title":{"runs":[{"text":"') + 26, txt.indexOf('"}],"accessibility":{"')),
                    url: txt.slice(tmpIndex + 28, tmpIndex + 39)
                })
                txt=txt.slice(tmpIndex+39);
                count--;
            }
        };
    });

    return List;
}

//찾은 유튜브 주소를 배열에 집어넣는 함수
async function searchYoutube(msg, searchStr){
    if (!msg.member.voice.channel)
        return msg.channel.send("보이스채널에서 해주세요");

    const limit = 8;  // 출력 갯수

    const embedSearchYoutube = {
        title:"노래 검색 목록",
        color: 0xF7CAC9,
        description:`**${searchStr}**에 대한 검색 결과에요~`,
        fields: []
    }
    var items = await searchYoutubeList(searchStr, limit); // 결과 중 items 항목만 가져옴
    const embedTempFunc = async function (){//이 함수를 먼저 작동되어야 함!
        return new Promise( resolve => {//위에서 이해되지 않았던 코드를 그대로 가져와 봄
            for (var i in items) {
                let n=i; n++;
                const explItem={
                    name: '\u200b',
                    value: `[${n}. ${items[i].title}](https://www.youtube.com/watch?v=${items[i].url})`,//markdown 사용
                    url: items[i].url
                };
                embedSearchYoutube.fields.push(explItem);
            }
            resolve(embedSearchYoutube);
        }); 
    }
    return await embedTempFunc();
}
