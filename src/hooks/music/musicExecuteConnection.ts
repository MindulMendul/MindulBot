<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { AudioResource, DiscordGatewayAdapterCreator, joinVoiceChannel, PlayerSubscription, VoiceConnectionStatus } from '@discordjs/voice';
import { musicCollection } from '../../../bot';
import { metadata, musicEntity } from '../../types/musicType';
import { musicExecutePlayer } from './musicExecutePlayer';

export const musicConnection = (guildId: string, resource: AudioResource<metadata>) => {
<<<<<<< HEAD
  const musicEntity = musicCollection.get(guildId) as musicEntity;
  const voiceChannel = musicEntity.voiceChannel;
  
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator
  });
  const subscription = connection.subscribe(musicEntity.audioPlayer) as PlayerSubscription;
  
  musicEntity.connection=connection;
  musicEntity.subscription=subscription;

  //준비가 되면 연결해서 노래를 틀어야지
  connection.on(VoiceConnectionStatus.Ready, async () => {
    musicExecutePlayer(guildId, resource); //아래에 있는 play함수 호출
  });

  connection.on(VoiceConnectionStatus.Disconnected, () => {
    // 안에 살아있는 친구들 다 죽이기
    musicEntity?.audioPlayer?.stop();
    musicEntity?.connection?.destroy();
    musicEntity?.reactCollector?.stop();
    musicEntity?.subscription?.unsubscribe();
    musicCollection.delete(guildId);
  });
};
=======
import { AudioResource, VoiceConnectionStatus } from "@discordjs/voice";
import { musicCollection } from "../../../bot";
import { metadata, musicEntity } from "../../types/musicType";
import { musicExecutePlayer } from "./musicExecutePlayer";
=======
import { AudioResource, VoiceConnectionStatus } from '@discordjs/voice';
=======
import { AudioResource, DiscordGatewayAdapterCreator, joinVoiceChannel, PlayerSubscription, VoiceConnectionStatus } from '@discordjs/voice';
>>>>>>> 72fbb1b6 (music 부분 리펙토링 & 루프 기능 추가)
import { musicCollection } from '../../../bot';
import { metadata, musicEntity } from '../../types/musicType';
import { musicExecutePlayer } from './musicExecutePlayer';
>>>>>>> a468518a (pretter 적용)

export const musicConnection = (guildId: string, resource: AudioResource<metadata>) => {
  const entity = musicCollection.get(guildId) as musicEntity;
  const voiceChannel = entity.voiceChannel;
=======
  let musicEntity = musicCollection.get(guildId) as musicEntity;
  const voiceChannel = musicEntity.voiceChannel;
>>>>>>> cb000350 (musicEntity 갱신 오류 수정)
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator
  });

  const subscription = connection.subscribe(musicEntity.audioPlayer) as PlayerSubscription;
  musicCollection.set(guildId, { ...musicEntity, ["connection"]: connection, ["subscription"]: subscription });
  musicEntity = musicCollection.get(guildId) as musicEntity;

  //준비가 되면 연결해서 노래를 틀어야지
  connection.on(VoiceConnectionStatus.Ready, async () => {
    await musicExecutePlayer(guildId, resource); //아래에 있는 play함수 호출
  });

<<<<<<< HEAD
	connection.on(VoiceConnectionStatus.Disconnected, () => {
		// 안에 살아있는 친구들 다 죽이기
		entity?.audioPlayer.stop();
		entity?.connection.destroy();
		entity?.reactCollector?.stop();
		entity?.subscription.unsubscribe();
		musicCollection.delete(guildId);
	})
};
>>>>>>> cbbf3d6f (music 리펙토링중 3)
=======
  connection.on(VoiceConnectionStatus.Disconnected, () => {
    // 안에 살아있는 친구들 다 죽이기
    musicEntity?.audioPlayer?.stop();
    musicEntity?.connection?.destroy();
    musicEntity?.reactCollector?.stop();
    musicEntity?.subscription?.unsubscribe();
    musicCollection.delete(guildId);
  });
};
>>>>>>> a468518a (pretter 적용)
