import { TextChannel, VoiceBasedChannel } from 'discord.js';
import { AudioPlayer, AudioResource, PlayerSubscription, VoiceConnection } from '@discordjs/voice';
import { YouTubeStream } from 'play-dl';


export interface musicOption {
	volume: number, // 실제로 쓰이는 값이 아니라 mute용 임시변수
	volumeMagnification: number,// 1/n 배 되는 거라 커질 수록 소리가 작아짐
	mute: boolean,
	loop: boolean,
	skip: boolean,
}

export interface musicEntity {
	guild: string
	voiceChannel: VoiceBasedChannel
	textChannel: TextChannel
	playStream: YouTubeStream
	connection: VoiceConnection
	subscription: PlayerSubscription
	audioPlayer: AudioPlayer
	song: AudioResource<{ title: string; url: string; }>
	songs: Array<AudioResource<{ title: string; url: string; }>>
	option: musicOption
}