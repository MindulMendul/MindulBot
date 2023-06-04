import {
  VoiceConnection,
  PlayerSubscription,
  AudioPlayer,
  AudioResource,
  createAudioPlayer,
  NoSubscriberBehavior
} from '@discordjs/voice';
import {
  VoiceBasedChannel,
  TextChannel,
  InteractionCollector,
  Message,
  MessageActionRowComponent,
  ButtonStyle
} from 'discord.js';
import { shuffle } from '../func/system/shuffle';
import { musicConnection } from '../func/music/musicConnection';
import { musicExecuteMsg } from '../func/music/musicExecuteMsg';
import { musicPlayer } from '../func/music/musicPlayer';
import { MusicOption } from './musicOption';
import { musicResource } from '../func/music/musicResource';
import { metadata } from '../types/type';
import { musicCollection } from '../collection/musicCollection';

export class MusicEntity {
  voiceChannel: VoiceBasedChannel;
  textChannel: TextChannel;
  InteractionCollector: InteractionCollector<any>;
  connection: VoiceConnection;
  subscription: PlayerSubscription;
  audioPlayer: AudioPlayer;
  playingSong: AudioResource<metadata>;
  songQueue: AudioResource<metadata>[];
  option: MusicOption;

  constructor() {
    this.audioPlayer = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });
    this.songQueue = [];
    this.option = new MusicOption();
  }

  public init(voiceChannel: VoiceBasedChannel, textChannel: TextChannel) {
    this.voiceChannel = voiceChannel;
    this.textChannel = textChannel;
  }

  public async connect() {
    return new Promise(async (resolve, reject) => {
      try {
        const guildId = this.textChannel.guildId;
        await musicConnection(guildId);
        await musicPlayer(guildId);
        await musicExecuteMsg(guildId);
        resolve(undefined);
      } catch (e) {
        reject(e);
      }
    });
  }

  public disconnect() {
    this.audioPlayer.removeAllListeners();
    this.audioPlayer.stop();
    this.InteractionCollector?.removeAllListeners();
    this.InteractionCollector?.stop();
    this.subscription?.unsubscribe();
    this.connection?.removeAllListeners();
    this.connection?.disconnect();
    musicCollection.delete(this.textChannel.guildId);
  }

  public async pushSongQueue(metadata: metadata) {
    const resource = await musicResource(metadata);
    const option = this.option;
    resource.volume.setVolume(option.ampl * option.volume * Number(!option.mute));
    this.songQueue.push(resource);
  }

  public skip() {
    this.audioPlayer.unpause();
    this.option.skip = true;
    this.subscription?.player.stop();
  }

  public empty() {
    this.skip();
    this.songQueue = [];
  }

  public async show() {
    const embedQueue = {
      color: 0xf7cac9,
      title: '큐에 들어간 노래 목록',
      description: `현재 재생중인 노래\n **${this.playingSong.metadata.title}**`,
      fields: this.songQueue.map((e, i) => {
        return {
          name: `\u200b${i + 1}. ${e.metadata.title}`,
          value: ``
        };
      })
    };

    await this.textChannel.send({ embeds: [embedQueue] });
  }

  public async shuffle() {
    shuffle(this.songQueue);
    await this.textChannel.send('큐에 들어간 곡이 무작위로 재배치되었습니다!');
    await this.show();
  }

  public async pause() {
    const audioPlayer = this.audioPlayer;
    if (audioPlayer.state.status == 'playing') {
      audioPlayer.pause();
      await this.textChannel.send('노래를 일시정지해 드렸어요!');
    } else {
      audioPlayer.unpause();
      await this.textChannel.send('노래를 다시 재생합니다~');
    }
  }

  public async loop() {
    const option = this.option;
    option.loop = !option.loop;

    if (!option.loop) await this.textChannel.send('더이상 큐에 있던 녀석들이 반복되지 않아요!');
    else await this.textChannel.send('큐 반복 기능이 활성화되었습니다~');
  }

  public async mute() {
    const option = this.option;
    option.mute = !option.mute;

    this.playingSong.volume.setVolume(option.ampl * option.volume * Number(!option.mute));
    if (option.mute) await this.textChannel.send(`음소거되었어요`);
    else await this.textChannel.send(`원래 소리로 돌아갔어요.\n현재 볼륨:${Math.round(option.volume * 100)}%`);
  }

  public async setVolume(value: number) {
    const option = this.option;
    if (option.mute) {
      await this.textChannel.send('음소거 중이에요.');
      return;
    }

    option.volume = Math.max(0, Math.min(1, value));
    this.playingSong.volume.setVolume(option.ampl * option.volume * Number(!option.mute));
    await this.textChannel.send(`현재 볼륨: ${Math.round(option.volume * 100)}%`);
  }
}
