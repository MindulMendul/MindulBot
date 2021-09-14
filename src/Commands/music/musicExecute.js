const {musicQueue, searchYoutubeList}=require("./musicBot");
let {scheduling}=require("./musicBot");
const ytdl=require("ytdl-core");

module.exports = {
	name: "노래",
	cmd: ["노래", "시작", "선곡"],
    type: "music",
    permission: ["CONNECT", "SPEAK", "ADD_REACTIONS", "MANAGE_EMOJIS_AND_STICKERS"],
    async execute(msg, args){
        //권한 체크
        const voiceChannel = msg.member.voice.channel;
        const searchStr=args.join(" ");

        if (!voiceChannel)//보이스채널 체크
            return msg.channel.send("보이스채널에서 해주세요!");
        
        if(musicQueue.get(msg.guild.id)!=undefined) if (voiceChannel!=musicQueue.get(msg.guild.id).voiceChannel)
            return msg.channel.send("같은 보이스채널에서 해주세요!");
        
        if(searchStr=="")//빈 항목 체크
            return msg.channel.send("어떤 노래를 틀어야할지 모르겠어요 ㅠㅠ");

        //나가기 스케줄링이 걸려있을 경우
        if(scheduling!=undefined) {
            clearTimeout(scheduling);
            scheduling=undefined;
            musicQueue.delete(msg.guild.id);
        }

        let tmpMusicSite="";
        try{//노래 정보 추출
            if(searchStr.includes("https://")){//링크로 틀었을 때
                if(searchStr.includes("https://www.youtube.com/watch?v="))//유튜브 링크만 인정
                    tmpMusicSite=searchStr.slice(searchStr.indexOf("=")+1,searchStr.length);
                else if(searchStr.includes("https://youtu.be/"))
                tmpMusicSite=searchStr.slice(searchStr.indexOf("e/")+2,searchStr.length);
                else return msg.channel.send("링크가 잘못 되었네요.");
            }
            else tmpMusicSite = (await searchYoutubeList(searchStr, 1)).pop().url;
        } catch(err){return msg.channel.send(err);}//검색결과 없으면 없다고 말해주는 곳
        const musicSite = `https://www.youtube.com/watch?v=${tmpMusicSite}`;
        
        const songInfo = await ytdl.getInfo(musicSite);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            lengthSeconds: songInfo.videoDetails.lengthSeconds,
        };
        
        const serverQueue = musicQueue.get(msg.guild.id);

        if (!serverQueue) {
            const queueContruct = {//큐 생성자
                textChannel: msg.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [], //여기에 노래가 담김
                dispatcher: null, //노래 틀어주는 녀석
                volume: 30, mute: false,//노래 조절 기능
                loop: false, skip:false//노래 조절 기능
            };

            musicQueue.set(msg.guild.id, queueContruct);
            queueContruct.songs.push(song);
            try{
                queueContruct.connection = await voiceChannel.join(); //방 들어오기
            } catch(err){
                console.error(err);
                musicQueue.delete(msg.guild.id);
                return msg.channel.send("접속하는데 문제가 생겼어요 ㅠㅠ 다시 한 번 실행해주세요!");
            }
            
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
        
        const dispatcher = serverQueue.connection.play(ytdl(song.url));
        dispatcher.on("finish", () => {//finish라는 명령어가 있으니 주의!
            console.log("디스패쳐꺼짐");
            if(serverQueue.loop&&!serverQueue.skip)
                serverQueue.songs.push(serverQueue.songs.shift()); //루프가 되는지 확인
            else serverQueue.songs.shift();
            this.play(guild, serverQueue.songs[0]);
            serverQueue.skip=false;
        });

        dispatcher.on("speaking", (speaking) => {
            if(!speaking) console.log(`스피킹 안 함`);
        });

        dispatcher.on("error", async (err)=>{
            console.error(err);
            const msg=await serverQueue.textChannel.send(`**에러발생!**\n> ${err}`);

            require("./musicSkip").execute(msg);

            if(serverQueue.loop&&!serverQueue.skip)
                serverQueue.songs.push(serverQueue.songs.shift()); //루프가 되는지 확인
            else serverQueue.songs.shift();
            this.play(guild, serverQueue.songs[0]);
            serverQueue.skip=false;
        });

        dispatcher.setVolume(!serverQueue.mute*serverQueue.volume/200);
        serverQueue.dispatcher=dispatcher;//디스패쳐 저장

        //collector로 해결할 수 있지 않을까...??
        /*
        const {bot}=require("./../../../bot");
        bot.on('voiceStateUpdate', async (oldState, newState) => {
            if(!newState) return;//누가 방을 나갔는지 파악
            if(oldState.channelID!=oldState.guild.me.voice.channelID) return;//방을 나간 게 내 방이었는지 파악

            // 채널에 사람이 얼마나있는지 파악하기
            const oldNumber=oldState.channel.members.size;
            if (!oldNumber-1) {
                const msg=await serverQueue.textChannel.send("여러분 저 혼자에요... 저 혼자 남기고 그렇게 나가시는 건가요 ㅠㅠ\n괜찮아요, 전 혼자일 때가 더 많으니까요...\n그래도 지금은 너무 외로운데 같이 있어주면 안 될까요...?\n저는 여러분을 사,사,,아니 좋아하고 있어요...\n30초만 기다려보고 아니면 나가보겠습니다 ㅠㅠ");
                dispatcher.pause();//노래 멈춰두기
                setTimeout(() => {
                    if (!oldNumber - 1){ //여전히 사람이 없으면
                        msg.channel.send("이걸 안 들어오네 ㅡㅡ;;\n 님들 다음부턴 저 부르지 마세요.")
                        require("./musicEmpty").execute(msg);//노래 날리고
                        oldState.channel.leave(); // 나가기
                    }
                }, 3*1000); // 3초
            }
        });
        */
        
        const tmpmsg = await serverQueue.textChannel.send(`이번 선곡은~\n> **${song.title}**\n> ${song.url}`);
        
        tmpmsg.react("⏯");
        tmpmsg.react("⏩");
        tmpmsg.react("⏹");
        tmpmsg.react("🔁");
        tmpmsg.react("🔀");
        tmpmsg.react("🔇");
        tmpmsg.react("🔉");
        tmpmsg.react("🔊");

        if(serverQueue.mute) tmpmsg.channel.send("현재는 음소거가 된 상태에요, 참고하세요 ㅎㅎ");
        

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
            
            if(!musicQueue.get(msg.guild.id)) return;//노래 재생 중이 아닐 땐 사용을 막음
            
            const serverQueue = musicQueue.get(msg.guild.id);
            const dispatcher = serverQueue.dispatcher;
            
            switch (reaction.emoji.name) {
                case "⏯":
                    if(!serverQueue.voiceChannel.members.get(user.id))
                        return msg.channel.send("알맞은 보이스채널에서 틀어주세요!");
                    
                    if (dispatcher.paused) {
                        dispatcher.resume();
                        msg.channel.send("노래를 다시 틀어 드릴게요 ㅎㅎ");
                    } else {
                        dispatcher.pause();
                        msg.channel.send("노래를 일시정지해 드렸어요!");
                    }
                break;

                case "⏩": 
                    if(!serverQueue.voiceChannel.members.get(user.id))
                        return msg.channel.send("알맞은 보이스채널에서 틀어주세요!");
                    require("./musicSkip").execute(msg); break;
                
                case "⏹":
                    if(!serverQueue.voiceChannel.members.get(user.id))
                        return msg.channel.send("알맞은 보이스채널에서 틀어주세요!");
                    require("./musicEmpty").execute(msg); break;

                case "🔁":
                    if(!serverQueue.voiceChannel.members.get(user.id))
                        return msg.channel.send("알맞은 보이스채널에서 틀어주세요!");
                    require("./musicLoop").execute(msg); break;

                case "🔀": 
                    if(!serverQueue.voiceChannel.members.get(user.id))
                        return msg.channel.send("알맞은 보이스채널에서 틀어주세요!");
                    require("./musicShuffle").execute(msg); break;


                case "🔇":
                    if(!serverQueue.voiceChannel.members.get(user.id))
                        return msg.channel.send("알맞은 보이스채널에서 틀어주세요!");

                    serverQueue.mute = !(serverQueue.mute);
                    if (serverQueue.mute) {//뮤트 걸리고 나서
                        dispatcher.setVolume(0);
                        msg.channel.send(`음소거되었어요`);
                    } else {//뮤트 풀리고 나서
                        dispatcher.setVolume(serverQueue.volume / 200);
                        msg.channel.send(`원래 소리로 돌아갔어요, 현재 볼륨:${serverQueue.volume}%`);
                    }
                break;

                case "🔉":
                    if(!serverQueue.voiceChannel.members.get(user.id))
                        return msg.channel.send("알맞은 보이스채널에서 틀어주세요!");

                    if (serverQueue.mute) return msg.channel.send("음소거 중이에요.");
                    serverQueue.volume = Math.max(serverQueue.volume - 10, 0);
                    dispatcher.setVolume(serverQueue.volume / 200);
                    msg.channel.send(`현재 볼륨:${serverQueue.volume}%`);
                break;

                case "🔊":
                    if(!serverQueue.voiceChannel.members.get(user.id))
                        return msg.channel.send("알맞은 보이스채널에서 틀어주세요!");
                
                    if (serverQueue.mute) return msg.channel.send("음소거 중이에요.");
                    serverQueue.volume = Math.min(serverQueue.volume + 10, 100);
                    dispatcher.setVolume(serverQueue.volume / 200);
                    msg.channel.send(`현재 볼륨:${serverQueue.volume}%`);
                break;
            }
        });
    }
};