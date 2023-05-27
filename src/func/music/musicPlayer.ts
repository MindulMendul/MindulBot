import { AudioPlayerStatus } from '@discordjs/voice';
import { musicCollection } from '../../collection/musicCollection';
import { musicExecuteMsg } from './musicExecuteMsg';

export const musicPlayer = async (guildId: string) => {
  const musicEntity = musicCollection.get(guildId);
  const playNextSong = async () => {
    //재생중인 노래 없애기
    musicEntity.playingSong=undefined;
  
    //스킵 루프 조건 만족하면 루프돌리는 부분
    if (musicEntity.option.loop && !musicEntity.option.skip) musicEntity.pushSongQueue(musicEntity.playingSong.metadata);
  
    //틀었던 노래가 끝났을 때
    if (musicEntity.songQueue.length==0) {
      musicEntity.textChannel.send('노래 대기열이 모두 끝났어요, 나갑니다 ㅎㅎ');
      musicEntity.disconnect();
      return;
    }
  
    //다음 노래 있으면 틀어주는 코드
    await musicPlayer(guildId);
    await musicExecuteMsg(guildId);
  }

  return new Promise(async (resolve, reject)=>{
    const musicEntity = musicCollection.get(guildId);

    if(!musicEntity.playingSong) musicEntity.playingSong=musicEntity.songQueue.shift();
    
    try {
      musicEntity.audioPlayer.play(musicEntity.playingSong);
    } catch(e){
      playNextSong(); reject(e); return;
    }

    musicEntity.audioPlayer.once(AudioPlayerStatus.Idle, async () => {
      try {playNextSong();} catch(e) {reject(e);}
    });

    resolve(undefined);
  })
};
