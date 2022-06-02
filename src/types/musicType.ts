<<<<<<< HEAD
import {
  CacheType,
  Guild,
  InteractionCollector,
  MessageComponentInteraction,
  TextChannel,
  VoiceBasedChannel
} from 'discord.js';
import { AudioPlayer, AudioResource, PlayerSubscription, VoiceConnection } from '@discordjs/voice';

export interface musicOption {
  volume: number; // 실제로 쓰이는 값이 아니라 mute용 임시변수
  volumeMagnification: number; // 1/n 배 되는 거라 커질 수록 소리가 작아짐
  mute: boolean;
  loop: boolean;
  skip: boolean;
}

export interface metadata {
  title: string|undefined;
  url: string;
}

export interface musicEntity {
  guild: Guild;
  voiceChannel: VoiceBasedChannel;
  textChannel: TextChannel;
  reactCollector?: InteractionCollector<MessageComponentInteraction<CacheType>>;
  connection?: VoiceConnection;
  subscription?: PlayerSubscription;
  audioPlayer: AudioPlayer;
  playingSong: AudioResource<metadata>;
  songQueue: AudioResource<metadata>[];
  option: musicOption;
}
=======
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
>>>>>>> 92fc5a7c (music 부분 고치는 중)
