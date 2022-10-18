<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import { createAudioResource } from "@discordjs/voice";
>>>>>>> cb4347e6 (자잘한 코드 변경 (아주 조금 최적화))
import { stream, YouTubeStream, video_basic_info } from "play-dl";

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
		inputType: playStream.type,
	});
	return {playStream, resource};
}
>>>>>>> cbbf3d6f (music 리펙토링중 3)
=======
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

  return resource;
};
>>>>>>> a468518a (pretter 적용)
