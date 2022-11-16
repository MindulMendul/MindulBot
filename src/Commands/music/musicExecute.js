const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;
let scheduling=musicBot.scheduling;
const ytdl=require("ytdl-core");
const { bot } = require("../../../bot");

module.exports = {
	name: "노래",
	cmd: ["노래", "시작", "선곡"],
    type: "music",
    async execute(msg, args){
        //권한 체크
        const voiceChannel = msg.member.voice.channel;
        const searchStr=args.join(" ");

        if (!voiceChannel)//보이스채널 체크
            return msg.channel.send("보이스채널에서 해주세요!");
        
        if (msg.member.voice.channel!=serverQueue.voiceChannel)
            return msg.channel.send("같은 보이스채널에서 해주세요!");
        
        //퍼미션 체크
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK") || !msg.channel.permissionsFor(msg.client.user).has("ADD_REACTIONS"))
            return msg.channel.send(`권한이 없어서 사용할 수가 없어요.\n 현재 필요한 권한의 상태입니다.\n> 보이스채널 입장권한: ${permissions.has("CONNECT")}\n> 보이스채널 발언권한: ${permissions.has("SPEAK")}\n> 텍스트채널 이모지권한: ${msg.channel.permissionsFor(msg.client.user).has("ADD_REACTIONS")}`);
        
        if(searchStr=="")//빈 항목 체크
            return msg.channel.send("어떤 노래를 틀어야할지 모르겠어요 ㅠㅠ");

        //나가기 스케줄링이 걸려있을 경우
        if(scheduling!=undefined) {
            clearTimeout(scheduling);
            scheduling=undefined;
            musicQueue.delete(msg.guild.id);
        }

        //노래 정보 추출
        let tmpMusicSite="";
        if(searchStr.includes("https://")){//링크로 틀었을 때
            if(searchStr.includes("https://www.youtube.com/watch?v="))//유튜브 링크만 인정
                tmpMusicSite=searchStr.slice(searchStr.indexOf("=")+1,searchStr.length);
            else return msg.channel.send("링크가 잘못 되었네요.");
        }
        else tmpMusicSite = (await musicBot.searchYoutubeList(searchStr, 1)).pop().url;
        const musicSite = `https://www.youtube.com/watch?v=${tmpMusicSite}`;
        
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
                dispatcher: null, //노래 틀어주는 녀석
                volume: 30, mute: false, isPlaying: false,//노래 조절 기능
                loop: false, skip:false//노래 조절 기능
            };

            musicQueue.set(msg.guild.id, queueContruct);
            queueContruct.songs.push(song);
            var connection = await voiceChannel.join(); //방 들어오기
            queueContruct.connection = connection;

            this.play(msg.guild, queueContruct.songs[0]);
        } else {
            serverQueue.songs.push(song);
            return msg.channel.send(`**${song.title}**가 큐에 들어왔어요!`);
        }
    },

    //play 함수
    async play(guild, song){
        const serverQueue = musicQueue.get(guild.id);
        if (!song) {
            serverQueue.textChannel.send("**노래 끝!**\n30초가 되기 전에 다음 노래 선곡이 없으면 자동으로 나가집니다!");
            musicQueue.delete(guild.id);
            scheduling=setTimeout( ()=>{
                serverQueue.textChannel.send("노래봇이 종료되었습니다.");
                serverQueue.voiceChannel.leave();
            }, 30*1000);
            return;
        }
        
        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on("finish", (asdf) => {//finish라는 명령어가 있으니 주의!
                console.log(asdf);
                if(serverQueue.loop&&!serverQueue.skip) serverQueue.songs.push(serverQueue.songs.shift()); //루프가 되는지 확인
                else serverQueue.songs.shift();
                this.play(guild, serverQueue.songs[0]);
                serverQueue.skip=false;
            });
        dispatcher.setVolume(serverQueue.volume/200);
        serverQueue.dispatcher=dispatcher;//디스패쳐 저장
        
        const tmpmsg = await serverQueue.textChannel.send(`이번 선곡은~\n> **${song.title}**\n> ${song.url}`);
        
        tmpmsg.react("⏯");
        tmpmsg.react("⏩");
        tmpmsg.react("⏹");
        tmpmsg.react("🔁");
        tmpmsg.react("🔀");
        tmpmsg.react("🔇");
        tmpmsg.react("🔉");
        tmpmsg.react("🔊");

        this.react(tmpmsg);
    },
    async react(msg){
        const reactionFilter = (reaction, user) => {return (reaction.message == msg)&&(!user.bot);}
        const collector = msg.createReactionCollector(reactionFilter, {});
        collector.on('collect', (reaction, user) => {
            reaction.users.remove(user);
            const {bot}=require("./../../../bot");
            const checkGuildCmdQueue=bot.guildCmdQueue.get(`${msg.guild.id}${this.type}`);
            if(checkGuildCmdQueue.length!=0)
                return msg.channel.send(`${checkGuildCmdQueue} 명령어 입력 대기 중이라 잠시 뒤에 다시 부탁드립니다 ㅎㅎ`);
            
            const serverQueue = musicQueue.get(msg.guild.id);
            const dispatcher = serverQueue.dispatcher;
            
            switch (reaction.emoji.name) {
                case "⏯":
                    if (dispatcher.paused) {
                        dispatcher.resume();
                        msg.channel.send("노래를 다시 틀어 드릴게요 ㅎㅎ");
                    } else {
                        dispatcher.pause();
                        msg.channel.send("노래를 일시정지해 드렸어요!");
                    }
                break;

                case "⏩": require("./musicSkip").execute(msg); break;
                case "⏹": require("./musicEmpty").execute(msg); break;
                case "🔁": require("./musicLoop").execute(msg); break;
                case "🔀": require("./musicShuffle").execute(msg); break;

                case "🔇":
                    serverQueue.mute = !(serverQueue.mute);
                    if (serverQueue.mute) {//뮤트 걸리고 나서
                        dispatcher.setVolume(0);
                        msg.channel.send(`음소거되었어요`)
                    } else {//뮤트 풀리고 나서
                        dispatcher.setVolume(serverQueue.volume / 200);
                        msg.channel.send(`원래 소리로 돌아갔어요, 현재 볼륨:${serverQueue.volume}%`)
                    }
                break;

                case "🔉":
                    if (serverQueue.mute) return msg.channel.send("음소거 중이에요.");
                    serverQueue.volume = Math.max(serverQueue.volume - 10, 0);
                    dispatcher.setVolume(serverQueue.volume / 200);
                    msg.channel.send(`현재 볼륨:${serverQueue.volume}%`);
                break;

                case "🔊":
                    if (serverQueue.mute) return msg.channel.send("음소거 중이에요.");
                    serverQueue.volume = Math.min(serverQueue.volume + 10, 100);
                    dispatcher.setVolume(serverQueue.volume / 200);
                    msg.channel.send(`현재 볼륨:${serverQueue.volume}%`);
                break;
            }
        });
    }
};