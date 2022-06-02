import { GuildMember, Message, MessageActionRowComponent } from "discord.js";
import { createAudioResource, AudioPlayerStatus, AudioResource } from "@discordjs/voice";
import { MessageActionRow, MessageButton } from "discord.js";
import { stream } from "play-dl";
import { musicEntity } from "../../types/musicType";
import { VolumeTransformer } from "prism-media";
import { musicSkip } from "../../cmd/music/musicSkip";
import { musicEmpty } from "../../cmd/music/musicEmpty";
import { musicShuffle } from "../../cmd/music/musicShuffle";

export const musicExecutePlay = async (msg: Message, musicEntity: musicEntity, resource: AudioResource<{ title: string; url: string; }>) => {
  //기본 함수
  const audioPlayer = musicEntity.audioPlayer;
  const option = musicEntity.option;
  const textChannel = musicEntity.textChannel;
  const connection = musicEntity.connection;

  audioPlayer.play(resource);

  //플레이어 설정코드
  audioPlayer.once(AudioPlayerStatus.Playing, async () => {
    console.log('The audio player has started playing!');
  });

  audioPlayer.on('error', error => {
    musicEntity.textChannel.send(
      `에러났어요 ㅠㅠ (${error.message})
      > 에러가 난 곡 이름: ${(error.resource as AudioResource<{ title: string; url: string; }>).metadata.title}`
    );
    console.log(error);
    audioPlayer.stop();
  });

  audioPlayer.once(AudioPlayerStatus.Idle, async () => {
    //틀었던 노래가 끝났을 때
    console.log(`노래끝`);

    //스킵 루프 조건 만족하면 루프돌리는 부분
    if (option.loop && !option.skip) {
      const meta = resource.metadata;
      const playStream = await stream(meta.url);
      const nextSong = createAudioResource(playStream.stream, {
        metadata: meta,
        inlineVolume: true,
        silencePaddingFrames: 5,
        inputType: playStream.type,
      });
      const volume = nextSong.volume as VolumeTransformer;
      volume.setVolume(0.5 / option.volumeMagnification * Number(!option.mute));//노래 사운드 최초 설정해주는 곳
      musicEntity.songs.push(nextSong);
    }

    const nextSong = musicEntity.songs.shift();
    musicEntity.song = nextSong as AudioResource<{ title: string; url: string; }>;
    if (nextSong) {
      //다음 노래 있으면 틀어주는 코드
      const volume = nextSong.volume as VolumeTransformer;
      volume.setVolume(volume.volume * Number(!option.mute));
      musicExecutePlay(msg, musicEntity, nextSong);
    } else {
      textChannel.send("노래 대기열이 모두 끝났어요, 나갑니다 ㅎㅎ");
      if (connection) connection.destroy();//커넥션 삭제
      if (collector) collector.stop();//인터렉션 삭제
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
  if (option.loop) buttonLoop.setStyle('SUCCESS');
  const buttonMute = new MessageButton().setCustomId('🔇').setLabel('🔇').setStyle('SECONDARY');
  if (option.mute) buttonMute.setStyle('SUCCESS');
  const buttonSecond = new MessageActionRow()
    .addComponents(new MessageButton().setCustomId('⏯').setLabel('⏯').setStyle('SUCCESS'),)//pause on 상황일 때는 다음으로 넘어가지 않음
    .addComponents(buttonLoop,)
    .addComponents(buttonMute,);

  const song = resource.metadata;
  const sendedContent = { content: `이번 선곡은~\n> **${song.title}**\n> ${song.url}`, components: [button, buttonSecond] };
  const msgSungok = await textChannel.send(sendedContent);

  //버튼 인터렉션 콜렉터 부분
  const filter = (i: any) => { return i.message.id === msgSungok.id };
  const collector = msgSungok.channel.createMessageComponentCollector({ filter });
  collector.on("collect", async (i) => {
    const volumeMagnification = option.volumeMagnification;
    const voiceChannel = musicEntity.voiceChannel;

    const iMember = i.member as GuildMember;
    const iMessage = i.message as Message;
    const iComponent = i.component as MessageButton;

    const volume = resource.volume as VolumeTransformer;

    if (!voiceChannel) {//보이스채널 체크
      msgSungok.channel.send("보이스채널에서 해주세요!");
    } else {
      switch (i.customId) {
        case "⏩":
          musicSkip.execute(i.message as Message, []);
          break;

        case "⏹":
          musicEmpty.execute(i.message as Message, []);
          break;

        case "🔀":
          musicShuffle.execute(i.message as Message, []);
          break;

        case "🔉":
          if (iMember.voice.channelId != voiceChannel.id) {
            msg.channel.send("같은 보이스채널에서 해주세요!");
            //return await i.update(sendedContent); //버튼 업데이트
          }

          //if (option.mute) return msgSungok.channel.send("음소거 중이에요.");
          volume.setVolume(Math.max(volume.volume - 1 / (10 * volumeMagnification), 0));
          msgSungok.channel.send(`현재 볼륨:${Math.round(volume.volume * 100 * volumeMagnification)}%`);
          break;

        case "🔊":
          if (iMember.voice.channelId != voiceChannel.id) {
            msg.channel.send("같은 보이스채널에서 해주세요!");
            //return await i.update(sendedContent); //버튼 업데이트
          }

          //if (option.mute) return msgSungok.channel.send("음소거 중이에요.");
          volume.setVolume(Math.min(volume.volume + 1 / (10 * volumeMagnification), 1 / volumeMagnification));
          msgSungok.channel.send(`현재 볼륨:${Math.round(volume.volume * 100 * volumeMagnification)}%`);
          break;

        case "⏯":
          if (iMember.voice.channelId != voiceChannel.id) {
            msg.channel.send("같은 보이스채널에서 해주세요!");
            //return await i.update(sendedContent); //버튼 업데이트
          }

          //style 부분은 버튼 on off 시각화를 위함
          const stylePause = (iMessage.components[1].components.filter(
            (elem: MessageActionRowComponent) => { return (elem as MessageButton).label == "⏯" }
          ).pop() as MessageButton).style;

          if (stylePause == 'SUCCESS') {//on일 때 off으로 시각화
            iComponent.setStyle('SECONDARY');
            buttonSecond.components.splice(0, 1, iComponent);
            buttonSecond.setComponents(buttonSecond.components);
          } else if (stylePause == 'SECONDARY') {//off일 때 on으로 시각화
            iComponent.setStyle('SUCCESS');
            buttonSecond.components.splice(0, 1, iComponent);
            buttonSecond.setComponents(buttonSecond.components);
          }

          //pause 부분
          if (audioPlayer.state.status == "paused") {
            audioPlayer.unpause();
            msgSungok.channel.send("노래를 다시 틀어 드릴게요 ㅎㅎ");
          }
          else if (audioPlayer.state.status == "playing") {
            audioPlayer.pause();
            msgSungok.channel.send("노래를 일시정지해 드렸어요!");
          }
          break;

        case "🔁":
          if (iMember.voice.channelId != voiceChannel.id) {
            msg.channel.send("같은 보이스채널에서 해주세요!");
            //return await i.update(sendedContent); //버튼 업데이트
          }

          //style 부분은 버튼 on off 시각화를 위함
          const styleLoop = (iMessage.components[1].components.filter(
            (elem: MessageActionRowComponent) => { return (elem as MessageButton).label == "🔁" }
          ).pop() as MessageButton).style;
          
          if (styleLoop == 'SUCCESS') {//on일 때 off으로 시각화
            iComponent.setStyle('SECONDARY');
            buttonSecond.components.splice(1, 1, iComponent);
            buttonSecond.setComponents(buttonSecond.components);
          } else if (styleLoop == 'SECONDARY') {//off일 때 on으로 시각화
            iComponent.setStyle('SUCCESS');
            buttonSecond.components.splice(1, 1, iComponent);
            buttonSecond.setComponents(buttonSecond.components);
          }
          //require("./musicLoop").execute(i);//루프기능은 다른 곳에서 구현해둔 거 가져옴
          break;

        case "🔇":
          if (iMember.voice.channelId != voiceChannel.id) {
            msg.channel.send("같은 보이스채널에서 해주세요!");
            //return await i.update(sendedContent); //버튼 업데이트
          }

          //style 부분은 버튼 on off 시각화를 위함
          const styleMute = (iMessage.components[1].components.filter(
            (elem: MessageActionRowComponent) => { return (elem as MessageButton).label == "🔇" }
          ).pop() as MessageButton).style;

          if (styleMute == 'SUCCESS') {//on일 때 off으로 시각화
            iComponent.setStyle('SECONDARY');
            buttonSecond.components.splice(2, 1, iComponent);
            buttonSecond.setComponents(buttonSecond.components);
          } else if (styleMute == 'SECONDARY') {//off일 때 on으로 시각화
            iComponent.setStyle('SUCCESS');
            buttonSecond.components.splice(2, 1, iComponent);
            buttonSecond.setComponents(buttonSecond.components);
          }

          //mute 기능
          option.mute = !(option.mute);
          if (option.mute) {//뮤트 걸리고 나서
            option.volume = volume.volume;
            volume.setVolume(0);
            msgSungok.channel.send(`음소거되었어요`);
          } else {//뮤트 풀리고 나서
            volume.setVolume(option.volume);
            msgSungok.channel.send(`원래 소리로 돌아갔어요, 현재 볼륨:${Math.round(volume.volume * 100 * volumeMagnification)}%`);
          }
          break;
      }
      i.update(sendedContent); //버튼 업데이트
    }
  });
}