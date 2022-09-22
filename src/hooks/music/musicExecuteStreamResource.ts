import { createAudioResource } from '@discordjs/voice';
import { stream, YouTubeStream, video_basic_info } from 'play-dl';

export const musicExecuteStreamResource = async (searchedId: string) => {
  const playStream = (await stream(searchedId)) as YouTubeStream;
  const songInfo = (await video_basic_info(searchedId)).video_details;
  const resource = createAudioResource(playStream.stream, {
    metadata: {
      title: songInfo.title as string,
      url: songInfo.url
    },
    inlineVolume: true,
    silencePaddingFrames: 5,
    inputType: playStream.type
  });
  return { playStream, resource };
};
