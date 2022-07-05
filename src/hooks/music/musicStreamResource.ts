import { AudioResource, createAudioResource } from "@discordjs/voice";
import { stream, YouTubeStream, video_basic_info } from "play-dl";
import { metadata } from "../../types/musicType";

export const musicStreamResource = async (searchedId: string)
	: Promise<[YouTubeStream, AudioResource<metadata>]> => {
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
	return [playStream, resource];
}
