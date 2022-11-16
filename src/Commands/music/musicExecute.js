const {video_basic_info, stream, search}=require('play-dl');

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
    permission: ["CONNECT", "SPEAK", "READ_MESSAGE_HISTORY"], //링크 첨부는 뭐지?
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

        const searched = (await search(searchStr, { source : { youtube : "video" }, limit: 1})).pop();
        if (searched==undefined)
            return textChannel.send("검색결과가 없네요. 다른 키워드로 다시 시도해보세요!\n만약 유튜브 링크를 검색했다면 링크 뒷부분의 **&list**이후를 지워서 입력해보세요!");

        const playStream = await stream(searched.id);
        const songInfo = (await video_basic_info(searched.id)).video_details;
        const song = {
            title: songInfo.title,
            url: songInfo.url,
        };
        
        const resource=createAudioResource(playStream.stream, {
            metadata:song,
            inlineVolume: true,
            silencePaddingFrames:5,
            inputType: playStream.type,
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
                skip:false,
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
            resource.volume.setVolume(0.5/connection.subscription.option.volumeMagnification*!connection.subscription.option.mute);//노래 사운드
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
            audioPlayer.stop();
        });

        audioPlayer.once(AudioPlayerStatus.Idle, async (player) => {
             //틀었던 노래가 끝났을 때
            console.log(`노래끝`);

            //스킵 루프 조건 만족하면 루프돌리는 부분
            const loop=subscription.option.loop;
            const skip=subscription.option.skip;
            console.log(loop);
            console.log(skip);
            if(loop & !skip) {
                const meta=player.resource.metadata;
                const playStream = await stream(meta.url);
                const nextSong=createAudioResource(playStream.stream, {
                    metadata:meta,
                    inlineVolume: true,
                    silencePaddingFrames:5,
                    inputType: playStream.type,
                });
                nextSong.volume.setVolume(0.5/connection.subscription.option.volumeMagnification*!connection.subscription.option.mute);//노래 사운드 최초 설정해주는 곳
                subscription.songs.push(nextSong);
            }

            if(subscription.songs.length){
                //다음 노래 있으면 틀어주는 코드
                const nextSong=subscription.songs.shift();
                nextSong.volume.setVolume(player.resource.volume.volume*!connection.subscription.option.mute);
                this.play(connection, nextSong); 
            } else {
                connection.joinConfig.textChannel.send("노래 대기열이 모두 끝났어요, 나갑니다 ㅎㅎ");
                if(connection) connection.destroy();//커넥션 삭제
                if(collector) collector.stop();//인터렉션 삭제
            }
        });

        //Embed 생성하는 코드
        const button = new MessageActionRow()//첫 번째 줄 버튼
        .addComponents(new MessageButton().setCustomId('⏩').setLabel('⏩').setStyle('PRIMARY'),)
        .addComponents(new MessageButton().setCustomId('⏹').setLabel('⏹').setStyle('PRIMARY'),)
        .addComponents(new MessageButton().setCustomId('🔀').setLabel('🔀').setStyle('PRIMARY'),)
        .addComponents(new MessageButton().setCustomId('🔉').setLabel('🔉').setStyle('PRIMARY'),)
        .addComponents(new MessageButton().setCustomId('🔊').setLabel('🔊').setStyle('PRIMARY'),);
        //두 번째 줄 버튼(이건 ON OFF 시각화를 위해 추가적인 작업이 필요함)
        const buttonLoop = new MessageButton().setCustomId('🔁').setLabel('🔁').setStyle('SECONDARY');
        if(subscription.option.loop) buttonLoop.setStyle('SUCCESS');
        const buttonMute = new MessageButton().setCustomId('🔇').setLabel('🔇').setStyle('SECONDARY');
        if(subscription.option.mute) buttonMute.setStyle('SUCCESS');
        const buttonSecond = new MessageActionRow()
        .addComponents(new MessageButton().setCustomId('⏯').setLabel('⏯').setStyle('SUCCESS'),)//pause on 상황일 때는 다음으로 넘어가지 않음
        .addComponents(buttonLoop,)
        .addComponents(buttonMute,);

        const song=audioPlayer._state.resource.metadata;
        const sendedContent={content:`이번 선곡은~\n> **${song.title}**\n> ${song.url}`, components:[button, buttonSecond]};
        const msg = await connection.joinConfig.textChannel.send(sendedContent);

        //버튼 인터렉션 콜렉터 부분
        const filter = i => {return i.message.id===msg.id};
        const collector = msg.channel.createMessageComponentCollector({filter});
        collector.on('collect', async i => {
            const volumeMagnification=subscription.option.volumeMagnification;
            const voiceChannel=msg.member.voice.channel;
            if (!voiceChannel)//보이스채널 체크
                return msg.channel.send("보이스채널에서 해주세요!");
            switch (i.customId) {
                case "⏩": 
                    require("./musicSkip").execute(msg); break;
                
                case "⏹":
                    require("./musicEmpty").execute(msg); break;

                case "🔀": 
                    require("./musicShuffle").execute(msg); break;
                
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

                case "⏯":
                    //style 부분은 버튼 on off 시각화를 위함
                    const stylePause=i.message.components[1].components.filter((elem)=>{return elem.label=="⏯"}).pop().style;
                    if(stylePause=='SUCCESS'){//on일 때 off으로 시각화
                        i.component.setStyle('SECONDARY');
                        buttonSecond.components.splice(0, 1, i.component);
                        buttonSecond.setComponents(buttonSecond.components);
                    } else if(stylePause=='SECONDARY'){//off일 때 on으로 시각화
                        i.component.setStyle('SUCCESS');
                        buttonSecond.components.splice(0, 1, i.component);
                        buttonSecond.setComponents(buttonSecond.components);
                    }
                    
                    //pause 부분
                    if (audioPlayer._state.status=="paused") {
                        audioPlayer.unpause();
                        msg.channel.send("노래를 다시 틀어 드릴게요 ㅎㅎ");
                    }
                    else if(audioPlayer._state.status=="playing") {
                        audioPlayer.pause();
                        msg.channel.send("노래를 일시정지해 드렸어요!");
                    }
                break;

                case "🔁":
                    //style 부분은 버튼 on off 시각화를 위함
                    const styleLoop=i.message.components[1].components.filter((elem)=>{return elem.label=="🔁"}).pop().style;
                    if(styleLoop=='SUCCESS'){//on일 때 off으로 시각화
                        i.component.setStyle('SECONDARY');
                        buttonSecond.components.splice(1, 1, i.component);
                        buttonSecond.setComponents(buttonSecond.components);
                    } else if(styleLoop=='SECONDARY'){//off일 때 on으로 시각화
                        i.component.setStyle('SUCCESS');
                        buttonSecond.components.splice(1, 1, i.component);
                        buttonSecond.setComponents(buttonSecond.components);
                    }
                    require("./musicLoop").execute(msg);//루프기능은 다른 곳에서 구현해둔 거 가져옴
                break;

                case "🔇":
                    //style 부분은 버튼 on off 시각화를 위함
                    const styleMute=i.message.components[1].components.filter((elem)=>{return elem.label=="🔇"}).pop().style;
                    if(styleMute=='SUCCESS'){//on일 때 off으로 시각화
                        i.component.setStyle('SECONDARY');
                        buttonSecond.components.splice(2, 1, i.component);
                        buttonSecond.setComponents(buttonSecond.components);
                    } else if(styleMute=='SECONDARY'){//off일 때 on으로 시각화
                        i.component.setStyle('SUCCESS');
                        buttonSecond.components.splice(2, 1, i.component);
                        buttonSecond.setComponents(buttonSecond.components);
                    }

                    //mute 기능
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
            }
            await i.update(sendedContent); //버튼 업데이트
        });
    }
};