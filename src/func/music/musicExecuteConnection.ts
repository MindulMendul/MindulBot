import { joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice';
import { musicCollection } from '../../collection/musicCollection';

export const musicConnection = async (guildId: string) => {
  return new Promise((resolve, reject)=>{
    const musicEntity = musicCollection.get(guildId);
    const voiceChannel = musicEntity.voiceChannel;

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guildId,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator as any
    });

    const subscription = connection.subscribe(musicEntity.audioPlayer);
    musicEntity.connection = connection;
    musicEntity.subscription = subscription;
    connection.configureNetworking();

    resolve(undefined);
    // 노래가 1분 정도에서 이상하게 멈추는 버그 해결하는 코드
    // 원리 모름 ㅠㅠ (https://github.com/Androz2091/discord-player/issues/1630)
    // connection.on('stateChange', (oldState, newState) => {
    //   const oldNetworking = Reflect.get(oldState, 'networking');
    //   const newNetworking = Reflect.get(newState, 'networking');

    //   const networkStateChangeHandler = (oldNetworkState: any, newNetworkState: any) => {
    //     const newUdp = Reflect.get(newNetworkState, 'udp');
    //     clearInterval(newUdp?.keepAliveInterval);
    //   };

    //   oldNetworking?.off('stateChange', networkStateChangeHandler);
    //   newNetworking?.on('stateChange', networkStateChangeHandler);
    // });

    connection.on(VoiceConnectionStatus.Disconnected, () => {
      // 안에 살아있는 친구들 다 죽이기
      musicEntity.audioPlayer.removeAllListeners();
      musicEntity.audioPlayer.stop();
      musicEntity.connection?.removeAllListeners();
      musicEntity.connection?.destroy();
      musicEntity.reactCollector?.removeAllListeners();
      musicEntity.reactCollector?.stop();
      musicEntity.subscription?.unsubscribe();
      musicCollection.delete(guildId);
      connection.removeAllListeners();
    });
  });
};
