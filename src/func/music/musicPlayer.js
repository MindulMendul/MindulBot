import { musicCollection } from '../../collection/musicCollection.js';
import { musicExecuteMsg } from './musicExecuteMsg.js';
import { AudioPlayerStatus } from '@discordjs/voice';

export const musicPlayer = async (guildId) => {
  const musicEntity = musicCollection.get(guildId);
  const playNextSong = async () => {
    try {
      //스킵 루프 조건 만족하면 루프돌리는 부분
      if (musicEntity.option.loop && !musicEntity.option.skip)
        await musicEntity.pushSongQueue(musicEntity.playingSong.metadata);

      //재생중인 노래 없애기
      musicEntity.playingSong = undefined;

      //틀었던 노래가 끝났을 때
      if (musicEntity.songQueue.length == 0) {
        musicEntity.disconnect();
        await musicEntity.textChannel.send('노래 대기열이 모두 끝났어요, 나갑니다 ㅎㅎ');
        return;
      }

      //다음 노래 있으면 틀어주는 코드
      await musicPlayer(guildId);
      await musicExecuteMsg(guildId);
    } catch (e) {
      musicEntity.disconnect();
      console.error(e);
      console.log('player next song error');
    }
  };

  return new Promise(async (resolve, reject) => {
    const musicEntity = musicCollection.get(guildId);
    if (!musicEntity.playingSong) musicEntity.playingSong = musicEntity.songQueue.shift();
    musicEntity.playingSong.volume.setVolumeLogarithmic(
      musicEntity.option.ampl * musicEntity.option.volume * Number(!musicEntity.option.mute)
    );
    try {
      musicEntity.audioPlayer.on('error', (error) => {
        console.error(error);
        console.log('player playing error');
      });

      musicEntity.audioPlayer.on(AudioPlayerStatus.Playing, () => {
        //console.log('The audio player has started playing!');
      });

      musicEntity.audioPlayer.once(AudioPlayerStatus.Idle, async () => {
        playNextSong();
      });

      musicEntity.audioPlayer.on(AudioPlayerStatus.Idle, async () => {
        //console.log('asdfmqwqoqqqq');
      });

      musicEntity.audioPlayer.on(AudioPlayerStatus.Buffering, (oldState, newState) => {
        //console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
      });

      musicEntity.audioPlayer.play(musicEntity.playingSong);
      const subscription = musicEntity.connection.subscribe(musicEntity.audioPlayer);
      musicEntity.subscription = subscription;
    } catch (e) {
      console.error(e);
      playNextSong();
      reject(e);
    }

    resolve(undefined);
  });
};
