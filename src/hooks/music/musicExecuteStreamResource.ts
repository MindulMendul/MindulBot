<<<<<<< HEAD
import { createAudioResource } from '@discordjs/voice';
import { stream } from 'play-dl';
import { metadata } from '../../types/musicType';

export const musicExecuteStreamResource = async (searchedInfo: metadata) => {
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
=======
import { AudioResource, createAudioResource } from "@discordjs/voice";
import { stream, YouTubeStream, video_basic_info } from "play-dl";
import { metadata } from "../../types/musicType";

export const musicExecuteStreamResource = async (searchedId: string)
	: Promise<AudioResource<metadata>> => {
	const playStream = (await stream(searchedId)) as YouTubeStream;
	const songInfo = (await video_basic_info(searchedId)).video_details;
	const resource = createAudioResource(playStream.stream, {
		metadata: {
			title: songInfo.title as string,
			url: songInfo.url
		},
		inlineVolume: true,
		silencePaddingFrames: 5,
		inputType: playStream.type,
	});
	return resource;
}
>>>>>>> cbbf3d6f (music 리펙토링중 3)
