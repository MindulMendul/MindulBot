import { AudioResource, createAudioResource } from '@discordjs/voice';
import { stream } from 'play-dl';
import { metadata } from '../../types/type';

export const musicResource = async (metadata:metadata):Promise<AudioResource<metadata>> => {
  const playStream = await stream(metadata.url);
  let resource = createAudioResource(playStream.stream, {
    metadata: {
      title: metadata.title,
      url: metadata.url
    },
    inlineVolume: true,
    silencePaddingFrames: 5,
    inputType: playStream.type
  });

  return resource;
};
