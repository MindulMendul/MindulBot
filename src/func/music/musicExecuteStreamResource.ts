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
  console.log(resource.ended);
  while(resource.ended){
    console.log(`${searchedInfo.title}을 넣는 도중 에러가 생겼습니다.`);
    console.log(resource);
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
