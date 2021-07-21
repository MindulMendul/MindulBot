module.exports = {
	name: "테스트111",
	cmd: ["테스트111"],
    type: "music",
	async searchYoutubeList(question, limit){
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
};