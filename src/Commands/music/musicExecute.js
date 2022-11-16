const { searchYoutubeList}=require("./musicBot");
const ytdl=require("ytdl-core");
const {
    VoiceConnectionStatus,
    AudioPlayerStatus,
    NoSubscriberBehavior,
    joinVoiceChannel,
    getVoiceConnection,
    createAudioPlayer,
    createAudioResource,
} = require('@discordjs/voice');

module.exports = {
	name: "노래",
	cmd: ["노래", "시작", "선곡"],
    type: "music",
    permission: ["CONNECT", "SPEAK", "MANAGE_EMOJIS_AND_STICKERS", "READ_MESSAGE_HISTORY"],
    async execute(msg, args){
        //보이스채널 체크부분
        const voiceChannel=msg.member.voice.channel;
        if (!voiceChannel)//보이스채널 체크
            return msg.channel.send("보이스채널에서 해주세요!");

        //노래 검색부분
        const textChannel = msg.channel;
        const searchStr=args.join(" ");
        if(searchStr=="")//빈 항목 체크
            return textChannel.send("어떤 노래를 틀어야할지 모르겠어요 ㅠㅠ");
        
        let tmpMusicSite="";
        try{//노래 정보 추출
            if(searchStr.includes("https://")){//링크로 틀었을 때
                if(searchStr.includes("https://www.youtube.com/watch?v="))//유튜브 링크만 인정
                    tmpMusicSite=searchStr.slice(searchStr.indexOf("=")+1,searchStr.length);
                else if(searchStr.includes("https://youtu.be/"))
                    tmpMusicSite=searchStr.slice(searchStr.indexOf("e/")+2,searchStr.length);
                else return textChannel.send("링크가 잘못 되었네요.");
            }
            else tmpMusicSite = (await searchYoutubeList(searchStr, 1)).pop().url;
        } catch(err){return textChannel.send(err);}//검색결과 없으면 없다고 말해주는 곳
        const musicSite = `https://www.youtube.com/watch?v=${tmpMusicSite}`;
        
        const songInfo = await ytdl.getInfo(musicSite);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            lengthSeconds: songInfo.videoDetails.lengthSeconds,
        };
        const resource=createAudioResource(ytdl(song.url),{
            metadata:song,
            filter: 'audioonly',
            inlineVolume: true,
            silencePaddingFrames:5,
            });
        resource.volume.setVolume(1/12);
        //Guild 체크해서 생성자가 존재하는지 확인하는 곳
        if(getVoiceConnection(voiceChannel.guild.id)==undefined) {
            //플레이어가 존재하지 않아 최초로 노래를 틀어줘야 하는 상황
            const connection = joinVoiceChannel({//커넥션 생성
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                textChannel: msg.channel,
                subscription: null,
            });
            const audioPlayer = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });
            connection.subscription = connection.subscribe(audioPlayer);
            connection.subscription.songs=[];
            connection.subscription.option={
                volume:0, // 실제로 쓰이는 값이 아니라 mute용 임시변수
                volumeMagnification:6,// 1/n 배 되는 거라 커질 수록 소리가 작아짐
                mute:false,
                loop:false,
                skip:false,
            };

            connection.on(VoiceConnectionStatus.Ready, () => {
                console.log('The connection has entered the Ready state - ready to play audio!');
                this.play(connection, resource);//아래에 있는 play함수 호출
            });
        } else {
            //플레이어가 존재해서 큐에 넣으면 되는 상황
            const connection = getVoiceConnection(voiceChannel.guild.id);
            connection.subscription.songs.push(resource);
            msg.channel.send(`${song.title}가 큐에 들어왔어요~`);
        }
    },
    //play 함수
    async play(connection, resource){
        //기본 함수
        const audioPlayer=connection.subscription.player;
        const subscription=connection.subscription;
        
        audioPlayer.play(resource);

        //플레이어 설정코드
        audioPlayer.on(AudioPlayerStatus.Playing, async () => {
            console.log('The audio player has started playing!');
        });
        
        audioPlayer.on('error', error => {
            connection.joinConfig.textChannel.send(`에러났어요 ㅠㅠ (${error.message})\n> 에러가 난 곡 이름: ${error.resource.metadata.title}`);
            audioPlayer.stop();
        });

        audioPlayer.on(AudioPlayerStatus.Idle, (player) => {
             //틀었던 노래가 끝났을 때
            console.log("노래끝");
            if(subscription.songs.length){
                //다음 노래 있으면 틀어주는 코드
                this.play(connection, subscription.songs.shift());

                //스킵 루프 조건 만족하면 루프돌리는 부분
                const skip=subscription.option.skip;
                const loop=subscription.option.loop;
                if(!skip&&loop) subscription.songs.push(player.resource);
                subscription.option.skip=false;
            } else {
                audioPlayer.stop();
                connection.destroy();
            }
        });

        //Embed 생성하는 코드
        const song=audioPlayer._state.resource.metadata;
        const tmpmsg = await connection.joinConfig.textChannel.send(`이번 선곡은~\n> **${song.title}**\n> ${song.url}`);
        tmpmsg.react("⏯");
        tmpmsg.react("⏩");
        tmpmsg.react("⏹");
        tmpmsg.react("🔁");
        tmpmsg.react("🔀");
        tmpmsg.react("🔇");
        tmpmsg.react("🔉");
        await tmpmsg.react("🔊");
        this.react(tmpmsg, connection);
    },
    async react(msg, connection){
        //이모지 콜렉터
        const audioPlayer=connection.subscription.player;
        const subscription=connection.subscription;
        const reactionFilter = (reaction, user) => {return (reaction.message == msg)&&(!user.bot);}
        const collector = msg.createReactionCollector(reactionFilter, {});
        collector.on('collect', async (reaction, user) => {
            reaction.users.remove(user);
            const {bot}=require("../../../bot");
            const checkGuildCmdQueue=bot.guildCmdQueue.get(`${msg.guild.id}${this.type}`);
            if(checkGuildCmdQueue.length!=0)
                return msg.channel.send(`${checkGuildCmdQueue} 명령어 입력 대기 중이라 잠시 뒤에 다시 부탁드립니다 ㅎㅎ`);
            
            //보이스채널 체크하는 게 앞에 나오면, 아래 스위치에 해당되지 않는 이모지 선택 시에도 체크됨
            //if(!connection.voiceChannel.members.get(user.id))
            //    return msg.channel.send("알맞은 보이스채널에서 틀어주세요!");
            const resource=audioPlayer._state.resource;
            const volumeMagnification=subscription.option.volumeMagnification;
            switch (reaction.emoji.name) {
                case "⏯":
                    if (audioPlayer._state.status=="paused") {
                        audioPlayer.unpause();
                        msg.channel.send("노래를 다시 틀어 드릴게요 ㅎㅎ");
                    }
                    else if(audioPlayer._state.status=="playing") {
                        audioPlayer.pause();
                        msg.channel.send("노래를 일시정지해 드렸어요!");
                    }
                break;

                case "⏩": 
                    require("./musicSkip").execute(msg); break;
                
                case "⏹":
                    require("./musicEmpty").execute(msg); break;

                case "🔁":
                    require("./musicLoop").execute(msg); break;

                case "🔀": 
                    require("./musicShuffle").execute(msg); break;

                case "🔇":
                    subscription.option.mute = !(subscription.option.mute);
                    if (subscription.option.mute) {//뮤트 걸리고 나서
                        subscription.option.volume=resource.volume.volume;
                        await resource.volume.setVolume(0);
                        msg.channel.send(`음소거되었어요`);
                    } else {//뮤트 풀리고 나서
                        await resource.volume.setVolume(subscription.option.volume);
                        msg.channel.send(`원래 소리로 돌아갔어요, 현재 볼륨:${Math.round(resource.volume.volume*100*volumeMagnification)}%`);
                    }
                break;

                case "🔉":
                    if (subscription.option.mute) return msg.channel.send("음소거 중이에요.");
                    await resource.volume.setVolume(Math.max(resource.volume.volume-1/(10*volumeMagnification), 0));
                    msg.channel.send(`현재 볼륨:${Math.round(resource.volume.volume*100*volumeMagnification)}%`);
                break;

                case "🔊":
                    if (subscription.option.mute) return msg.channel.send("음소거 중이에요.");
                    await resource.volume.setVolume(Math.min(resource.volume.volume+1/(10*volumeMagnification), 1/volumeMagnification));
                    msg.channel.send(`현재 볼륨:${Math.round(resource.volume.volume*100*volumeMagnification)}%`);
                break;
            }
        });
    }
};