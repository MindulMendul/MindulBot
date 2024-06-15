import { createAudioResource } from '@discordjs/voice';
import { stream } from 'play-dl';

export const musicResource = async (metadata) => {
  const playStream = await stream(metadata.url, { discordPlayerCompatibility: true });
  let resource = createAudioResource(playStream.stream, {
    metadata: {
      title: metadata.title
      // url: metadata.url
    },
    inlineVolume: true,
    silencePaddingFrames: 5,
    inputType: playStream.type
  });

  return resource;
};
