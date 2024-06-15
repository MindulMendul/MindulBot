import { joinVoiceChannel } from '@discordjs/voice';
import { musicCollection } from '../../collection/musicCollection.js';

export const musicConnection = async (guildId) => {
  return new Promise((resolve, reject) => {
    const musicEntity = musicCollection.get(guildId);
    const voiceChannel = musicEntity.voiceChannel;

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guildId,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator
    });

    musicEntity.connection = connection;
    connection.configureNetworking();

    //노래가 1분 정도에서 이상하게 멈추는 버그 해결하는 코드
    //원리 모름 ㅠㅠ (https://github.com/Androz2091/discord-player/issues/1630)
    connection.on('stateChange', (oldState, newState) => {
      if (newState.status == 'disconnected') musicEntity.disconnect();

      const oldNetworking = Reflect.get(oldState, 'networking');
      const newNetworking = Reflect.get(newState, 'networking');

      const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
        const newUdp = Reflect.get(newNetworkState, 'udp');
        clearInterval(newUdp?.keepAliveInterval);
      };

      oldNetworking?.off('stateChange', networkStateChangeHandler);
      newNetworking?.on('stateChange', networkStateChangeHandler);
    });

    resolve(undefined);

    connection.on('error', (error) => {
      reject(error);
    });
  });
};
