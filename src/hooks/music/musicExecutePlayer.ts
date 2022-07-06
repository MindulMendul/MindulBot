import { AudioPlayerStatus, AudioResource, createAudioResource } from '@discordjs/voice';
import { metadata, musicEntity } from '../../types/musicType';
import { musicCollection } from '../../../bot';
import { musicExecuteMsg } from './musicExecuteMsg';
import { musicExecuteStreamResource } from './musicExecuteStreamResource';

export const musicExecutePlayer = async (guildId: string, playingSong: AudioResource<metadata>) => {
  //기본 함수
  const musicEntity = musicCollection.get(guildId) as musicEntity;
  const { audioPlayer, option, textChannel, connection } = musicEntity;

  audioPlayer.play(playingSong);
  musicExecuteMsg(guildId);

  //플레이어 설정코드
  audioPlayer.on('error', (error) => {
    musicEntity.textChannel.send(
      `에러났어요 ㅠㅠ (${error.message})
      > 에러가 난 곡 이름: ${(error.resource as AudioResource<metadata>).metadata.title}`
    );
    console.log(error);
    audioPlayer.stop();
  });

  audioPlayer.once(AudioPlayerStatus.Idle, async () => {
    //스킵 루프 조건 만족하면 루프돌리는 부분
    if (option.loop && !option.skip){
      musicEntity.songQueue.push(
        await musicExecuteStreamResource(playingSong.metadata.url)
      );
    }

    //틀었던 노래가 끝났을 때
    const nextSong = musicEntity.songQueue.shift();
    if (!nextSong) {
      textChannel.send('노래 대기열이 모두 끝났어요, 나갑니다 ㅎㅎ');
      connection?.disconnect(); //커넥션 삭제
      return;
    }

    //다음 노래 있으면 틀어주는 코드
    musicEntity.playingSong = nextSong;
    nextSong.volume?.setVolume(option.volume / option.volumeMagnification * Number(!option.mute));
    musicCollection.set(guildId, musicEntity);
    await musicExecutePlayer(guildId, nextSong);
  });
};
