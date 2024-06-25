import { createAudioResource } from '@discordjs/voice';
import ytdl from '@distube/ytdl-core';

export const musicResource = async (metadata) => {
  const ytdlOption = {
    filter: 'audioonly',
    fmt: 'mp3',
    highWaterMark: 1 << 30,
    liveBuffer: 1 << 30,
    dlChunkSize: 4096,
    bitrate: 128,
    quality: 'lowestaudio'
  };

  const stream = ytdl(metadata.url, ytdlOption);
  //const playStream = await stream(metadata.url, { discordPlayerCompatibility: true });
  let resource = createAudioResource(stream, {
    metadata: {
      title: metadata.title,
      url: metadata.url
    },
    inlineVolume: true,
    silencePaddingFrames: 5
  });

  return resource;
};
