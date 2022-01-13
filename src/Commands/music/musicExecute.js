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
const {MessageActionRow, MessageButton}=require('discord.js');

module.exports = {
	name: "노래",
	cmd: ["노래", "시작", "선곡"],
    type: "music",
    permission: ["CONNECT", "SPEAK", "MANAGE_EMOJIS_AND_STICKERS", "READ_MESSAGE_HISTORY"],//링크 첨부는 뭐지?
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
            };
            resource.volume.setVolume(0.5/connection.subscription.option.volumeMagnification);//노래 사운드 최초 설정해주는 곳

            connection.on(VoiceConnectionStatus.Ready, () => {
                console.log('The connection has entered the Ready state - ready to play audio!');
                this.play(connection, resource);//아래에 있는 play함수 호출
            });
        } else {
            //플레이어가 존재해서 큐에 넣으면 되는 상황
            const connection = getVoiceConnection(voiceChannel.guild.id);
            connection.subscription.songs.push(resource);
            resource.volume.setVolume(0.5/connection.subscription.option.volumeMagnification);//노래 사운드
            msg.channel.send(`${song.title}가 큐에 들어왔어요~`);
        }
    },
    //play 함수
    async play(connection, resource){
        //기본 함수
        const subscription=connection.subscription;
        const audioPlayer=connection.subscription.player;
         
        await audioPlayer.play(resource);

        //플레이어 설정코드
        audioPlayer.once(AudioPlayerStatus.Playing, async () => {
            console.log('The audio player has started playing!');
        });
        
        audioPlayer.on('error', error => {
            connection.joinConfig.textChannel.send(`에러났어요 ㅠㅠ (${error.message})\n> 에러가 난 곡 이름: ${error.resource.metadata.title}`);
            console.log(error);
            if(connection) connection.destroy();
        });

        audioPlayer.once(AudioPlayerStatus.Idle, (player) => {
             //틀었던 노래가 끝났을 때
            console.log("노래끝");
            if(subscription.songs.length){
                //다음 노래 있으면 틀어주는 코드
                this.play(connection, subscription.songs.shift());
                //스킵 루프 조건 만족하면 루프돌리는 부분
                const loop=subscription.option.loop;
                if(loop) {
                    const meta=player.resource.metadata;
                    const nextSong=createAudioResource(ytdl(meta.url),{
                        metadata:meta,
                        filter: 'audioonly',
                        inlineVolume: true,
                        silencePaddingFrames:5,
                        });
                    nextSong.volume.setVolume(0.5/connection.subscription.option.volumeMagnification);//노래 사운드 최초 설정해주는 곳
                    subscription.songs.push(nextSong);
                }
            } else {
                connection.joinConfig.textChannel.send("노래 대기열이 모두 끝났어요, 나갑니다 ㅎㅎ");
                if(connection) connection.destroy();//커넥션 삭제
                if(collector) collector.stop();//인터렉션 삭제
            }
        });

        //Embed 생성하는 코드
        const button = new MessageActionRow()//첫 번째 줄 버튼
        .addComponents(new MessageButton().setCustomId('⏯').setLabel('⏯').setStyle('PRIMARY'),)
        .addComponents(new MessageButton().setCustomId('⏩').setLabel('⏩').setStyle('PRIMARY'),)
        .addComponents(new MessageButton().setCustomId('⏹').setLabel('⏹').setStyle('PRIMARY'),)
        .addComponents(new MessageButton().setCustomId('🔁').setLabel('🔁').setStyle('PRIMARY'),)
        .addComponents(new MessageButton().setCustomId('🔀').setLabel('🔀').setStyle('PRIMARY'),)
        const buttonSound = new MessageActionRow()//두 번째 줄 버튼
        .addComponents(new MessageButton().setCustomId('🔇').setLabel('🔇').setStyle('SECONDARY'),)
        .addComponents(new MessageButton().setCustomId('🔉').setLabel('🔉').setStyle('SECONDARY'),)
        .addComponents(new MessageButton().setCustomId('🔊').setLabel('🔊').setStyle('SECONDARY'),);

        const song=audioPlayer._state.resource.metadata;
        const sendedContent={content:`이번 선곡은~\n> **${song.title}**\n> ${song.url}`, components:[button, buttonSound]};
        const msg = await connection.joinConfig.textChannel.send(sendedContent);

        //버튼 인터렉션 콜렉터 부분
        const filter = i => {return true};
        const collector = msg.channel.createMessageComponentCollector({filter});
        collector.on('collect', async i => {
            i.update(sendedContent);
            switch (i.customId) {
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