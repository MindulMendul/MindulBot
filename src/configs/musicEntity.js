import { createAudioPlayer, NoSubscriberBehavior } from '@discordjs/voice';
import { shuffle } from '../func/system/shuffle.js';
import { musicConnection } from '../func/music/musicConnection.js';
import { musicExecuteMsg } from '../func/music/musicExecuteMsg.js';
import { musicPlayer } from '../func/music/musicPlayer.js';
import { MusicOption } from './musicOption.js';
import { musicResource } from '../func/music/musicResource.js';
import { musicCollection } from '../collection/musicCollection.js';

export class MusicEntity {
  voiceChannel;
  textChannel;
  InteractionCollector;
  connection;
  subscription;
  audioPlayer;
  playingSong;
  songQueue;
  option;

  constructor() {
    this.audioPlayer = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });
    this.songQueue = [];
    this.option = new MusicOption();
  }

  init(voiceChannel, textChannel) {
    this.voiceChannel = voiceChannel;
    this.textChannel = textChannel;
  }

  async connect() {
    return new Promise(async (resolve, reject) => {
      try {
        const guildId = this.textChannel.guildId;
        await musicConnection(guildId);
        await musicPlayer(guildId);
        await musicExecuteMsg(guildId);
        resolve(undefined);
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect() {
    this.audioPlayer.removeAllListeners();
    this.audioPlayer.stop();
    this.InteractionCollector?.removeAllListeners();
    this.InteractionCollector?.stop();
    this.subscription?.unsubscribe();
    this.connection?.removeAllListeners();
    this.connection?.disconnect();
    musicCollection.delete(this.textChannel.guildId);
  }

  async pushSongQueue(metadata) {
    const resource = await musicResource(metadata);
    this.songQueue.push(resource);
  }

  skip() {
    this.audioPlayer.unpause();
    this.option.skip = true;
    this.subscription?.player.stop();
  }

  empty() {
    this.skip();
    this.songQueue = [];
  }

  async show() {
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

  async shuffle() {
    shuffle(this.songQueue);
    await this.textChannel.send('큐에 들어간 곡이 무작위로 재배치되었습니다!');
    await this.show();
  }

  async pause() {
    const audioPlayer = this.audioPlayer;
    if (audioPlayer.state.status == 'playing') {
      audioPlayer.pause();
      await this.textChannel.send('노래를 일시정지해 드렸어요!');
    } else {
      audioPlayer.unpause();
      await this.textChannel.send('노래를 다시 재생합니다~');
    }
  }

  async loop() {
    this.option.loop = !this.option.loop;

    if (!this.option.loop) await this.textChannel.send('더이상 큐에 있던 녀석들이 반복되지 않아요!');
    else await this.textChannel.send('큐 반복 기능이 활성화되었습니다~');
  }

  async mute() {
    this.option.mute = !this.option.mute;

    // 사운드 조절 부분
    this.playingSong.volume.setVolumeLogarithmic(this.option.ampl * this.option.volume * Number(!this.option.mute));
    this.songQueue.foreach((e) => {
      e.volume.setVolumeLogarithmic(this.option.ampl * this.option.volume * Number(!this.option.mute));
    });

    // 메시지
    if (this.option.mute) await this.textChannel.send(`음소거되었어요`);
    else await this.textChannel.send(`원래 소리로 돌아갔어요.\n현재 볼륨:${Math.round(this.option.volume * 100)}%`);
  }

  async setVolume(value) {
    if (this.option.mute) {
      await this.textChannel.send('음소거 중이에요.');
      return;
    }

    this.option.volume = Math.max(0, Math.min(1, value));

    //사운드 조절 부분
    this.playingSong.volume.setVolumeLogarithmic(this.option.ampl * this.option.volume * Number(!this.option.mute));
    this.songQueue.foreach((e) => {
      e.volume.setVolumeLogarithmic(this.option.ampl * this.option.volume * Number(!this.option.mute));
    });

    // 메시지
    await this.textChannel.send(`현재 볼륨: ${Math.round(this.option.volume * 100)}%`);
  }
}
