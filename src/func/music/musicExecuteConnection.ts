import {
  AudioResource,
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
  PlayerSubscription,
  VoiceConnectionStatus
} from '@discordjs/voice';
import { bot, musicCollection } from '../../../bot';
import { metadata, musicEntity } from '../../types/musicType';
import { musicExecutePlayer } from './musicExecutePlayer';

export const musicConnection = (guildId: string, resource: AudioResource<metadata>) => {
  const musicEntity = musicCollection.get(guildId) as musicEntity;
  const voiceChannel = musicEntity.voiceChannel;

  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guildId,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator as any
  });
  const subscription = connection.subscribe(musicEntity.audioPlayer) as PlayerSubscription;
  musicEntity.connection = connection;
  musicEntity.subscription = subscription;
  connection.configureNetworking();

  //준비가 되면 연결해서 노래를 틀어야지
  connection.on(VoiceConnectionStatus.Ready, async () => {
    musicExecutePlayer(guildId, resource); //아래에 있는 play함수 호출
  });

  connection.on('error', (error) => {
    bot.emit('error', new Error('Voice Connection Error'));
    console.log(error);
    connection.destroy();
  });

  // 노래가 1분 정도에서 이상하게 멈추는 버그 해결하는 코드
  // 원리 모름 ㅠㅠ (https://github.com/Androz2091/discord-player/issues/1630)
  connection.on('stateChange', (oldState, newState) => {
    const oldNetworking = Reflect.get(oldState, 'networking');
    const newNetworking = Reflect.get(newState, 'networking');

    const networkStateChangeHandler = (oldNetworkState: any, newNetworkState: any) => {
      const newUdp = Reflect.get(newNetworkState, 'udp');
      clearInterval(newUdp?.keepAliveInterval);
    };

    oldNetworking?.off('stateChange', networkStateChangeHandler);
    newNetworking?.on('stateChange', networkStateChangeHandler);
  });

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
  });
};
