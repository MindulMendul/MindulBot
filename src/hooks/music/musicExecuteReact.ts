import {
  GuildMember,
  Message,
  MessageButton,
  MessageActionRowComponent,
  MessageComponentInteraction
} from 'discord.js';
import { AudioResource } from '@discordjs/voice';
import { VolumeTransformer } from 'prism-media';
import { musicEntity } from '../../types/musicType';
import { musicEmpty } from '../../cmd/music/musicEmpty';
import { musicShuffle } from '../../cmd/music/musicShuffle';
import { musicSkip } from '../../cmd/music/musicSkip';
import { musicCollection } from '../../../bot';
import { musicVisualizeOnOff } from './musicVisualizeOnOff';

export const musicExecuteReact = (
  msgSungok: Message,
  resource: AudioResource<{ title: string; url: string }>
) => {
  const guildId=msgSungok.guildId as string;
  const musicEntity = musicCollection.get(guildId) as musicEntity;
  const audioPlayer = musicEntity.audioPlayer;
  const option = musicEntity.option;

  //버튼 인터렉션 콜렉터 부분
  const filter = (i: MessageComponentInteraction) => {
    return i.message.id === msgSungok.id;
  };

  const collector = msgSungok.channel.createMessageComponentCollector({ filter });

  collector.on('collect', async (i) => {
    const volumeMagnification = option.volumeMagnification;
    const voiceChannel = musicEntity.voiceChannel;

    const iMember = i.member as GuildMember;
    const iMessage = i.message as Message;
    const volume = resource.volume as VolumeTransformer;
    const sendedContent = {
      content: iMessage.content,
      components: iMessage.components
    };

    if (!voiceChannel) {
      //보이스채널 체크
      msgSungok.channel.send('보이스채널에서 해주세요!');
    } else if (iMember.voice.channelId != voiceChannel.id) {
      //같은 보이스채널 체크
      msgSungok.channel.send('같은 보이스채널에서 해주세요!');
      i.update(sendedContent); //버튼 업데이트
    } else {
      switch (i.customId) {
        case '⏩':
          musicSkip.execute(iMessage, []);
          break;

        case '⏹':
          musicEmpty.execute(iMessage, []);
          break;

        case '🔀':
          musicShuffle.execute(iMessage, []);
          break;

        case '🔉':
          if (option.mute) msgSungok.channel.send('음소거 중이에요.');
          else {
            option.volume=Number(Math.max(0, option.volume-0.1).toFixed(1));
            volume.setVolume(option.volume/volumeMagnification);
            msgSungok.channel.send(`현재 볼륨:${Math.round(volume.volume * 100 * volumeMagnification)}%`);
          }
          break;

        case '🔊':
          if (option.mute) msgSungok.channel.send('음소거 중이에요.');
          else {
            option.volume=Number(Math.min(1, option.volume+0.1).toFixed(1));
            volume.setVolume(option.volume/volumeMagnification);
            msgSungok.channel.send(`현재 볼륨:${Math.round(volume.volume * 100 * volumeMagnification)}%`);
          }
          break;

        case '⏯':
          //style 부분은 버튼 on off 시각화를 위함
          musicVisualizeOnOff('⏯', i, 0);

          //pause 부분
          if (audioPlayer.state.status == 'paused') {
            audioPlayer.unpause();
            msgSungok.channel.send('노래를 다시 틀어 드릴게요 ㅎㅎ');
          } else if (audioPlayer.state.status == 'playing') {
            audioPlayer.pause();
            msgSungok.channel.send('노래를 일시정지해 드렸어요!');
          }
          break;

        case '🔁':
          //style 부분은 버튼 on off 시각화를 위함
          musicVisualizeOnOff('🔁', i, 1);

          option.loop = !option.loop;
          if (option.loop) msgSungok.channel.send('큐 반복 기능이 활성화되었습니다~');
          else msgSungok.channel.send('더이상 큐에 있던 녀석들이 반복되지 않아요!');
          break;

        case '🔇':
          //style 부분은 버튼 on off 시각화를 위함
          musicVisualizeOnOff('🔇', i, 2);

          //mute 기능
          option.mute = !option.mute;
          if (option.mute) {
            //뮤트 걸리고 나서
            volume.setVolume(0);
            msgSungok.channel.send(`음소거되었어요`);
          } else {
            //뮤트 풀리고 나서
            volume.setVolume(option.volume/volumeMagnification);
            msgSungok.channel.send(
              `원래 소리로 돌아갔어요, 현재 볼륨:${Math.round(volume.volume * 100 * volumeMagnification)}%`
            );
          }
          break;
      }
      i.update(sendedContent); //버튼 업데이트
    }
  });

  musicEntity.reactCollector?.stop();
  musicEntity.reactCollector = collector;
  return collector;
};
