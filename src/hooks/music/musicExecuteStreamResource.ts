import { createAudioResource } from '@discordjs/voice';
import { stream, YouTubeVideo } from 'play-dl';

export const musicExecuteStreamResource = async (searchedInfo: YouTubeVideo) => {
  const playStream = (await stream(searchedInfo.url));

  const resource = createAudioResource(playStream.stream, {
    metadata: {
      title: searchedInfo.title,
      url: searchedInfo.url
    },
    inlineVolume: true,
    silencePaddingFrames: 5,
    inputType: playStream.type
  });

  if(!resource.volume) throw "노래에 볼륨이가 없음";

  return resource;
};