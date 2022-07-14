import { CacheType, Guild, InteractionCollector, MessageComponentInteraction, TextChannel, VoiceBasedChannel } from 'discord.js';
import { AudioPlayer, AudioResource, PlayerSubscription, VoiceConnection } from '@discordjs/voice';
import { YouTubeStream } from 'play-dl';

export interface musicOption {
  volume: number; // 실제로 쓰이는 값이 아니라 mute용 임시변수
  volumeMagnification: number; // 1/n 배 되는 거라 커질 수록 소리가 작아짐
  mute: boolean;
  loop: boolean;
  skip: boolean;
}

export interface metadata {
  title: string;
  url: string
}

export interface musicEntity {
  guild: Guild;
  voiceChannel: VoiceBasedChannel;
  textChannel: TextChannel;
  reactCollector?: InteractionCollector<MessageComponentInteraction<CacheType>>;
  connection: VoiceConnection;
  subscription: PlayerSubscription;
  audioPlayer: AudioPlayer;
  playStream: YouTubeStream;
  playingSong: AudioResource<metadata>;
  songQueue: AudioResource<metadata>[];
  option: musicOption;
}
