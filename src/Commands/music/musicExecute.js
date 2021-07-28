const musicBot=require("./musicBot");
const musicQueue=musicBot.musicQueue;
let scheduling=musicBot.scheduling;
const ytdl=require("ytdl-core"); 

module.exports = {
	name: "노래",
	cmd: ["노래", "시작", "선곡"],
    type: "music",
    async execute(msg, args){
        //권한 체크
        const voiceChannel = msg.member.voice.channel;
        const searchStr=args.join(" ");

        if (!voiceChannel)//보이스채널 체크
            return msg.channel.send("보이스채널에서 해주세요");
        
        //퍼미션 체크
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK") || !msg.channel.permissionsFor(msg.client.user).has("ADD_REACTIONS"))
            return msg.channel.send(`권한이 없어서 사용할 수가 없어요.\n 현재 필요한 권한의 상태입니다.\n> 보이스채널 입장권한: ${permissions.has("CONNECT")}\n> 보이스채널 발언권한: ${permissions.has("SPEAK")}\n> 텍스트채널 이모지권한: ${msg.channel.permissionsFor(msg.client.user).has("ADD_REACTIONS")}`);
        
        if(searchStr=="")//빈 항목 체크
            return msg.channel.send("어떤 노래를 틀어야할지 모르겠어요 ㅠㅠ");

        //명령 대기 체크
        const bot=require("./../../../bot").bot;
        if(!bot.guildCmdQueue.get(msg.guild.id))
            return msg.reply(`명령어를 사용하려면 ${this.name} 명령어가 끝날 때까지 기다려야 합니다.`);
        bot.guildCmdQueue.set(msg.guild.id, false);

        //나가기 스케줄링이 걸려있을 경우
        if(scheduling!=undefined) {
            clearTimeout(scheduling);
            scheduling=undefined;
            musicQueue.delete(msg.guild.id);
        }

        //노래 정보 추출
        const tmpMusicSite = await musicBot.searchYoutubeList(searchStr, 1);
        //const musicSite=`https://www.youtube.com/watch?v=jYcGHGiFkMo`;
        const musicSite = `https://www.youtube.com/watch?v=${tmpMusicSite.pop().url}`;

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
                volume: 30, mute: false, isPlaying: false, loop: false//노래 조절 기능
            };

            musicQueue.set(msg.guild.id, queueContruct);
            queueContruct.songs.push(song);
            try {
                var connection = await voiceChannel.join(); //방 들어오기
                queueContruct.connection = connection;
                this.play(msg.guild, queueContruct.songs[0]);
                bot.guildCmdQueue.set(msg.guild.id, true);//명령 대기 확인
            } catch (err) {
                console.log(err);
                musicQueue.delete(msg.guild.id);
                return msg.channel.send(err);
            }
        } else {
            serverQueue.songs.push(song);
            bot.guildCmdQueue.set(msg.guild.id, true);//명령 대기 확인
            return msg.channel.send(`**${song.title}**가 큐에 들어왔어요!`);
        }
    },

    //play 함수
    async play(guild, song){
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
                if(serverQueue.loop) serverQueue.songs.push(serverQueue.songs.shift()); //루프가 되는지 확인
                else serverQueue.songs.shift();
                this.play(guild, serverQueue.songs[0]);
            });
        dispatcher.setVolume(serverQueue.volume/200);
        serverQueue.dispatcher=dispatcher;//디스패쳐 저장
        
        const tmpmsg = await serverQueue.textChannel.send(`이번 선곡은~\n> **${song.title}**\n> ${song.url}`);
        
        tmpmsg.react("⏯")
            .then(()=>tmpmsg.react("⏩"))
            .then(()=>tmpmsg.react("⏹"))
            .then(()=>tmpmsg.react("🔁"))
            .then(()=>tmpmsg.react("🔀"))
            .then(()=>tmpmsg.react("🔇"))
            .then(()=>tmpmsg.react("🔉"))
            .then(()=>tmpmsg.react("🔊"));

        this.react(tmpmsg);
    },
    async react(msg){
        const serverQueue = musicQueue.get(msg.guild.id);
        const dispatcher = serverQueue.dispatcher;
        return new Promise(()=>{
            const bot=require("./../../../bot").bot;
            bot.on("messageReactionAdd", (reaction, user)=>{
                if(user.bot) return;//봇이 하면 안 되게 막는 코드
                if(reaction.message!=msg) return;

                reaction.users.remove(user);
                switch(reaction.emoji.name){
                    case "⏯":
                        if(dispatcher.paused){
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
                        serverQueue.mute=!(serverQueue.mute);
                        if(serverQueue.mute){//뮤트 걸리고 나서
                            dispatcher.setVolume(0);
                            msg.channel.send(`음소거되었어요`)
                        } else {//뮤트 풀리고 나서
                            dispatcher.setVolume(serverQueue.volume/200);
                            msg.channel.send(`원래 소리로 돌아갔어요, 현재 볼륨:${serverQueue.volume}%`)
                        }
                    break;

                    case "🔉":
                        serverQueue.volume=Math.max(serverQueue.volume-10, 0);
                        dispatcher.setVolume(serverQueue.volume/200);
                        msg.channel.send(`현재 볼륨:${serverQueue.volume}%`);
                    break;

                    case "🔊":
                        serverQueue.volume=Math.min(serverQueue.volume+10, 100);
                        dispatcher.setVolume(serverQueue.volume/200);
                        msg.channel.send(`현재 볼륨:${serverQueue.volume}%`);
                    break;
                }
            });
        });
    }

};