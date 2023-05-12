import { createAudioResource } from '@discordjs/voice';
import { stream } from 'play-dl';
import { metadata } from '../../types/musicType';

export const musicExecuteStreamResource = async (searchedInfo: metadata) => {
  const playStream = await stream(searchedInfo.url);

  let resource = createAudioResource(playStream.stream, {
    metadata: {
      title: searchedInfo.title,
      url: searchedInfo.url
    },
    inlineVolume: true,
    silencePaddingFrames: 5,
    inputType: playStream.type
  });

  while(resource.ended){
    console.log(`${searchedInfo.title}을 넣으려고 했지만 이미 끝난 노래네요. 다시 시도해볼게요.`);
    resource = createAudioResource(playStream.stream, {
      metadata: {
        title: searchedInfo.title,
        url: searchedInfo.url
      },
      inlineVolume: true,
      silencePaddingFrames: 5,
      inputType: playStream.type
    });
  }

  return resource;
};
