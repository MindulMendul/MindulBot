import { joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice';
import { musicCollection } from '../../collection/musicCollection';

export const musicConnection = async (guildId: string) => {
  return new Promise((resolve, reject) => {
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

    connection.on('error', (error) => {
      console.log("asdfasdf5");
      reject(error);
    });
  });
};
