import { createAudioResource } from '@discordjs/voice';
import ytdl from '@distube/ytdl-core';

export const musicResource = async (metadata) => {
  const stream = ytdl(metadata.url, { filter: 'audioonly' });
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
