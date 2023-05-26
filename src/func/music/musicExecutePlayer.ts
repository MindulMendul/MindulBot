import { AudioPlayerStatus, AudioResource } from '@discordjs/voice';
import { metadata } from '../../types/musicType';
import { bot } from '../../../bot';
import { musicExecuteStreamResource } from './musicExecuteStreamResource';
import { musicCollection } from '../../collection/musicCollection';

export const musicExecutePlayer = async (guildId: string, playingSong: AudioResource<metadata>) => {
  return new Promise(async (resolve, reject)=>{
    const musicEntity = musicCollection.get(guildId);
    const { audioPlayer, option, textChannel, connection, songQueue } = musicEntity;

    if (!playingSong.ended) {
      audioPlayer.play(playingSong);
    } else {
      console.log(playingSong);
      const nextSong = songQueue.shift();
      audioPlayer.removeAllListeners();

      if (nextSong) {
        musicEntity.playingSong = nextSong;
        nextSong.volume?.setVolume(option.ampl * option.volume * Number(!option.mute));
        musicCollection.set(guildId, musicEntity);
        musicExecutePlayer(guildId, nextSong);
      } else {
        textChannel.send('노래 대기열이 모두 끝났어요, 나갑니다!');
        connection.disconnect();
      }
    }
    resolve(undefined);

    //플레이어 설정코드
    audioPlayer.on('error', (error) => {
      bot.emit('error', new Error('Audio Player Error'));
      console.log(error);
      musicEntity.textChannel.send(
        `에러났어요 ㅠㅠ (${error.message})
        > 에러가 난 곡 이름: ${(error.resource as AudioResource<metadata>).metadata.title}`
      );
      audioPlayer.stop(true);
    });

    audioPlayer.once(AudioPlayerStatus.Idle, async () => {
      //스킵 루프 조건 만족하면 루프돌리는 부분
      if (option.loop && !option.skip) {
        if (!playingSong.ended) {
          musicEntity.songQueue.push(playingSong);
        } else {
          const newSong = await musicExecuteStreamResource(playingSong.metadata);
          musicEntity.songQueue.push(newSong);
        }
      }
      //틀었던 노래가 끝났을 때
      const nextSong = musicEntity.songQueue.shift();
      audioPlayer.removeAllListeners();
      if (!nextSong) {
        textChannel.send('노래 대기열이 모두 끝났어요, 나갑니다 ㅎㅎ');
        connection?.disconnect(); //커넥션 삭제
        return;
      }

      //다음 노래 있으면 틀어주는 코드
      musicEntity.playingSong = nextSong;
      nextSong.volume?.setVolume(option.ampl * option.volume * Number(!option.mute));
      musicCollection.set(guildId, musicEntity);
      musicExecutePlayer(guildId, nextSong);
    });
  });
};
