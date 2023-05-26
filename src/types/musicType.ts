import {
  Guild,
  InteractionCollector,
  TextChannel,
  VoiceBasedChannel
} from 'discord.js';
import { AudioPlayer, AudioResource, PlayerSubscription, VoiceConnection } from '@discordjs/voice';

export interface musicOption {
  volume: number; // 실제로 쓰이는 값이 아니라 mute용 임시변수
  volumeAmpl: number; // 1/n 배 되는 거라 커질 수록 소리가 작아짐
  mute: boolean;
  loop: boolean;
  skip: boolean;
}

export interface metadata {
  title: string | undefined;
  url: string;
}

export interface musicEntity {
  guild: Guild;
  voiceChannel: VoiceBasedChannel;
  textChannel: TextChannel;
  reactCollector?: InteractionCollector<any>;
  connection?: VoiceConnection;
  subscription?: PlayerSubscription;
  audioPlayer: AudioPlayer;
  playingSong: AudioResource<metadata>;
  songQueue: AudioResource<metadata>[];
  option: musicOption;
}
