const ytdl=require("ytdl-core"); //노래봇
const musicQueue = new Map();

//youtube 검색 코드
const Youtube = require('youtube-node');
const youtube = new Youtube();

youtube.setKey('AIzaSyCwe-_exbXDwtNy2gw1T1pWLD1wym4oY9M'); // API 키 입력

//// 검색 옵션 시작
//추가로 arg 선택사항으로 rating video creativeCommon 결정 가능하게 하기 ㅎ
youtube.addParam('order', 'relevance'); // 연관성 순으로 정렬
youtube.addParam('type', 'music'); // 타입 지정
youtube.addParam('videoLicense', 'any'); // 라이센스는 몰라
//// 검색 옵션 끝

let scheduling=undefined;

//execute 함수
async function execute(msg, searchStr){
    //권한 체크
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel){
        return msg.channel.send(
            "보이스채널에서 해주세요"
        );
    }
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if(!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return msg.channel.send(
            "권한이 없네요?"
        );
    }
    if(searchStr==""){
        return msg.channel.send("어떤 노래를 틀어야할지 모르겠어요 ㅠㅠ");
    }

    //나가기 스케줄링이 걸려있을 경우
    if(scheduling!=undefined) {
        clearTimeout(scheduling);
        scheduling=undefined;
        musicQueue.delete(msg.guild.id);
    }
    
    //노래 정보 추출
    let items;
    const asdf = async function (){//이 함수를 먼저 작동되어야 함!
        return new Promise( resolve => {//이를 위해서 promise를 썼는데 왜 되는지는 모르겠음 ㅋ
            youtube.search(searchStr, 1, (err, result) => {
                if (err) { console.log(err); return; } // 에러일 경우 에러공지하고 빠져나감
                items = result["items"].pop(); // 결과 중 items 항목만 가져옴
                resolve(`https://www.youtube.com/watch?v=${items["id"]["videoId"]}`);  
            });
        })
    }

    const musicSite = await asdf();
    const songInfo = await ytdl.getInfo(musicSite);
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };

    const serverQueue = musicQueue.get(msg.guild.id);

    if (!serverQueue) {
        const queueContruct = {//큐 생성자
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [], //여기에 노래가 담김
            volume: 2,
            playing: true
        };

        musicQueue.set(msg.guild.id, queueContruct);
        queueContruct.songs.push(song);
        try {
            var connection = await voiceChannel.join(); //방 들어오기
            queueContruct.connection = connection;
            play(msg.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            musicQueue.delete(msg.guild.id);
            return msg.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        return msg.channel.send(`**${song.title}**가 큐에 들어왔어요!`);
    }
} 

//skip 함수
function skip(msg){
    const serverQueue = musicQueue.get(msg.guild.id);

    if (!msg.member.voice.channel)
        return msg.channel.send(
          "보이스채널에서 해주세요"
        );
    if (!serverQueue)
        return msg.channel.send("스킵할 노래가 없어요!");
    serverQueue.connection.dispatcher.end();
}

//stop 함수
function stop(msg){
    const serverQueue = musicQueue.get(msg.guild.id);

    if (!msg.member.voice.channel)
        return msg.channel.send(
          "보이스채널에서 해주세요"
        );
      
    if (!serverQueue)
        return msg.channel.send("멈출 노래가 없는데요?");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}

//play 함수
function play(guild, song){
    const serverQueue = musicQueue.get(guild.id);

    if (!song) {
        serverQueue.textChannel.send("**노래 끝!**\n30초가 되기 전에 다음 노래 선곡이 없으면 자동으로 나가집니다!");
        scheduling=setTimeout( ()=>{
            serverQueue.textChannel.send("노래봇이 종료되었습니다.");
            serverQueue.voiceChannel.leave();
            musicQueue.delete(guild.id);
        }, 30*1000);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {//finish라는 명령어가 있으니 주의!
                             //끝! 뭐 이런 식으로 바꾸지 마, 멍청아!
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));//역시 이것도 위와 동
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`이번 선곡은~\n> **${song.title}**\n> ${song.url}`);
}

function show(msg){
    const serverQueue = musicQueue.get(msg.guild.id);
    
    if(!serverQueue)
        return msg.channel.send("재생목록에 노래가 없어요!");
    else{
        let i=1;//첫 라벨은 그냥

        const embedQueue = {
            color: 0xF7CAC9,
            title:"큐에 들어간 노래 목록",
            fields: []
        }

        serverQueue.songs.forEach(element => {
            const explSong = {
                name:'\u200b',
                value: `${i++}. ${element.title}`
            }
            embedQueue.fields.push(explSong);
        });
        
        return msg.channel.send({embed: embedQueue});
    }
}

//remove 함수
function remove(msg, array){
    const serverQueue = musicQueue.get(msg.guild.id);

    if(!serverQueue)
        return msg.channel.send("재생목록에 노래가 없어요!");
    
    if(array==[])
        return msg.channel.send("어떤 곡을 지울지 모르겠어요!");
    
    let tempStr="해당 노래가 맞아요?\n";
    array.forEach(element=>{
        tempStr+=`> **${element.charAt()}. ${serverQueue.songs[element.charAt()-1].title}**\n`;
    });
    tempStr+="7초의 시간을 드릴 거에요!\n맞으면 네, 아니라면 그 밖에 아무 말이나 하세요.";
    msg.channel.send(tempStr);
}

async function searchYoutube(msg, searchStr){
    const word = searchStr; // 검색어 지정
    const limit = 10;  // 출력 갯수

    var n=1;
    const embedSearchYoutube = {
        title:"노래 검색 목록",
        color: 0xF7CAC9,
        fields: []
    }

    const embedTempFunc = async function (){//이 함수를 먼저 작동되어야 함!
        return new Promise( resolve => {//위에서 이해되지 않았던 코드를 그대로 가져와 봄
            youtube.search(word, limit, (err, result) => {
                if (err) { console.log(err); return; } // 에러일 경우 에러공지하고 빠져나감
                var items = result["items"]; // 결과 중 items 항목만 가져옴
                
                for (var i in items) {
                    const it = items[i];
                    const title = it["snippet"]["title"];
                    const url = `https://www.youtube.com/watch?v=${it["id"]["videoId"]}`;
                    
                    const explItem={
                        name: '\u200b',
                        value: `[${n++}. ${title}](${url})`,//markdown 사용
                        url: url
                    };
                    embedSearchYoutube.fields.push(explItem);
                }
                resolve(embedSearchYoutube);
            });
        }); 
    }
    return await embedTempFunc();
}

module.exports={musicQueue, scheduling, execute, skip, stop, play, show, remove, searchYoutube};