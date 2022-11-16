const axios = require("axios");
const cheerio = require("cheerio");
const ytdl=require("ytdl-core"); 

async function verCheck(){
    const url=await axios.get("https://www.npmjs.com/package/ytdl-core");//ytdl-core 사이트에 들어감
    const $ = cheerio.load(url.data);//데이터를 긁어모음
    const html = $("body").children().html();//열심히 긁어모음
    const dir =`<p class="f2874b88 fw6 mb3 mt2 truncate black-80 f4">`;//버전이 적혀있는 위치를 찾음
    const index =html.indexOf(dir)+dir.length;//그 위치를 수색함
    return (html.slice(index,index+5)==ytdl.version);//슬라이스해서 비교
}
module.exports={verCheck};