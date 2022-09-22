import { AudioResource, VoiceConnectionStatus } from '@discordjs/voice';
import { musicCollection } from '../../../bot';
import { metadata, musicEntity } from '../../types/musicType';
import { musicExecutePlayer } from './musicExecutePlayer';

export const musicConnection = (guildId: string, resource: AudioResource<metadata>) => {
  const entity = musicCollection.get(guildId) as musicEntity;
  const connection = entity.connection;

  //준비가 되면 연결해서 노래를 틀어야지!
  connection.on(VoiceConnectionStatus.Ready, async () => {
    await musicExecutePlayer(guildId, resource); //아래에 있는 play함수 호출
  });

  connection.on(VoiceConnectionStatus.Disconnected, () => {
    // 안에 살아있는 친구들 다 죽이기
    entity?.audioPlayer.stop();
    entity?.connection.destroy();
    entity?.reactCollector?.stop();
    entity?.subscription.unsubscribe();
    musicCollection.delete(guildId);
  });
};
