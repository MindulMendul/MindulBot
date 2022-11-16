import { GuildMember, Message, MessageButton, MessageComponentInteraction, MessageActionRow } from 'discord.js';
import { VolumeTransformer } from 'prism-media';
import { musicEntity } from '../../types/musicType';
import { musicEmpty } from '../../cmd/music/musicEmpty';
import { musicShuffle } from '../../cmd/music/musicShuffle';
import { musicSkip } from '../../cmd/music/musicSkip';
import { guildCmdQueue, musicCollection } from '../../../bot';
import { CMD } from '../../types/type';

export const musicExecuteMsg = async (guildId: string) => {
  const musicEntity = musicCollection.get(guildId) as musicEntity;
  const { voiceChannel, textChannel, audioPlayer, option, playingSong } = musicEntity;
  
  const buttonFirst = new MessageActionRow()
    .addComponents(new MessageButton().setCustomId('⏩').setLabel('⏩').setStyle('PRIMARY'))
    .addComponents(new MessageButton().setCustomId('⏹').setLabel('⏹').setStyle('PRIMARY'))
    .addComponents(new MessageButton().setCustomId('🔀').setLabel('🔀').setStyle('PRIMARY'))
    .addComponents(new MessageButton().setCustomId('🔉').setLabel('🔉').setStyle('PRIMARY'))
    .addComponents(new MessageButton().setCustomId('🔊').setLabel('🔊').setStyle('PRIMARY'));
  //두 번째 줄 버튼(이건 ON OFF 시각화를 위해 추가적인 작업이 필요함)
  const buttonSecond = new MessageActionRow()
    .addComponents(new MessageButton().setCustomId('⏯').setLabel('⏯').setStyle('SUCCESS')) //pause on 상황일 때는 다음으로 넘어가지 않음
    .addComponents(
      new MessageButton()
        .setCustomId('🔁')
        .setLabel('🔁')
        .setStyle(option.loop ? 'SUCCESS' : 'SECONDARY')
    )
    .addComponents(
      new MessageButton()
        .setCustomId('🔇')
        .setLabel('🔇')
        .setStyle(option.mute ? 'SUCCESS' : 'SECONDARY')
    );

  //Embed 생성하는 코드
  //첫 번째 줄 버튼
  const song = playingSong.metadata;
  const sendedContent = {
    content: `이번 선곡은~\n> **${song.title}**\n> ${song.url}`,
    components: [buttonFirst, buttonSecond]
  };
  const msgSungok = await textChannel.send(sendedContent);

  //버튼 인터렉션 콜렉터 부분
  const filter = (i: MessageComponentInteraction) => {
    return i.message.id === msgSungok.id;
  };
  const collector = msgSungok.channel.createMessageComponentCollector({ filter });

  collector.on('collect', async (i) => {
    const iMessage = i.message as Message;
    const iMember = i.member as GuildMember;
    const iGuildId = i.guildId as string;
    const iComponent = i.component as MessageButton;

    const checkGuildCmdQueue=guildCmdQueue.get(`${iGuildId}music`) as CMD[];
    if (checkGuildCmdQueue.length){
      textChannel.send(`${checkGuildCmdQueue[0].name} 명령어 입력 대기 중이라 잠시 뒤에 다시 부탁드립니다 ㅎㅎ`);
      i.update({ content: iMessage.content, components: iMessage.components }); //버튼 업데이트
      return;
    }

    //보이스채널 체크
    if (!voiceChannel) {
      textChannel.send('보이스채널에서 해주세요!');
      i.update({ content: iMessage.content, components: iMessage.components }); //버튼 업데이트
      return;
    }

    //같은 보이스채널 체크
    if (iMember.voice.channelId != voiceChannel.id) {
      textChannel.send('같은 보이스채널에서 해주세요!');
      i.update({ content: iMessage.content, components: iMessage.components }); //버튼 업데이트
      return;
    }

    const volumeMagnification = option.volumeMagnification;
    const volume = playingSong.volume as VolumeTransformer;

    switch (i.customId) {
      case '⏩':
        musicSkip.execute(iMessage);
        break;

      case '⏹':
        musicEmpty.execute(iMessage);
        break;

      case '🔀':
        musicShuffle.execute(iMessage);
        break;

      case '🔉':
        if (option.mute) {
          msgSungok.channel.send('음소거 중이에요.');
          break;
        }
        option.volume = Number(Math.max(0, option.volume - 0.1).toFixed(1));
        volume.setVolume(option.volume / volumeMagnification);
        msgSungok.channel.send(`현재 볼륨:${Math.round(volume.volume * volumeMagnification * 100)}%`);
        break;

      case '🔊':
        if (option.mute) {
          msgSungok.channel.send('음소거 중이에요.');
          break;
        }
        option.volume = Number(Math.min(1, option.volume + 0.1).toFixed(1));
        volume.setVolume(option.volume / volumeMagnification);
        msgSungok.channel.send(`현재 볼륨:${Math.round(volume.volume * volumeMagnification * 100)}%`);
        break;

      case '⏯':
        if (audioPlayer.state.status == 'playing') {
          audioPlayer.pause();
          iComponent.setStyle('SECONDARY'); //on일 때 off으로 시각화
          msgSungok.channel.send('노래를 일시정지해 드렸어요!');
        } else {
          audioPlayer.unpause();
          iComponent.setStyle('SUCCESS'); //off일 때 on으로 시각화
          msgSungok.channel.send('노래를 다시 틀어 드릴게요 ㅎㅎ');
        }
        break;

      case '🔁':
        option.loop = !option.loop;
        if (!option.loop) {
          iComponent.setStyle('SECONDARY'); //on일 때 off으로 시각화
          msgSungok.channel.send('더이상 큐에 있던 녀석들이 반복되지 않아요!');
        } else {
          iComponent.setStyle('SUCCESS'); //off일 때 on으로 시각화
          msgSungok.channel.send('큐 반복 기능이 활성화되었습니다~');
        }
        break;

      case '🔇':
        option.mute = !option.mute;
        if (option.mute) {
          iComponent.setStyle('SUCCESS'); //off일 때 on으로 시각화
          volume.setVolume(0);
          msgSungok.channel.send(`음소거되었어요`);
        } else {
          iComponent.setStyle('SECONDARY'); //on일 때 off으로 시각화
          volume.setVolume(option.volume / volumeMagnification);
          msgSungok.channel.send(
            `원래 소리로 돌아갔어요, 현재 볼륨:${Math.round(volume.volume * 100 * volumeMagnification)}%`
          );
        }
        break;
    }
    i.update({ content: iMessage.content, components: iMessage.components }); //버튼 업데이트
  });

  musicEntity.reactCollector?.stop();
  musicEntity.reactCollector = collector;
  return collector;
};
