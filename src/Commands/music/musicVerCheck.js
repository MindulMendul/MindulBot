const axios = require("axios");
const cheerio = require("cheerio");
const ytdl=require("ytdl-core");
const {OWNER_ID}=require("./../../../GlobalVariable");

async function verCheck(bot, msg){
    const url=await axios.get("https://www.npmjs.com/package/ytdl-core");//ytdl-core 사이트에 들어감
    const $ = cheerio.load(url.data);//데이터를 긁어모음
    const html = $("body").children().html();//열심히 긁어모음
    const dir =`<p class="f2874b88 fw6 mb3 mt2 truncate black-80 f4">`;//버전이 적혀있는 위치를 찾음
    const index =html.indexOf(dir)+dir.length;//그 위치를 수색함
    
    if(html.slice(index,index+5)!=ytdl.version){//슬라이스해서 비교
        msg.channel.send("노래봇 버전이 안 맞아서 지원이 어렵네요. 해당작업은 아직 개발자의 무지함으로 인해 수작업으로 처리해야 합니다, 최대한 빨리 업데이트 해드릴게요, 양해부탁드립니다 ㅠㅠ");
        bot.users.cache.get(OWNER_ID).send(`노래봇 업데이트 필요\nnpm install ytdl-core@latest`);
    }
    return (html.slice(index,index+5)!=ytdl.version);
}
module.exports={verCheck};