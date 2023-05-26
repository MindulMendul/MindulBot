import { VoiceConnection, PlayerSubscription, AudioPlayer, AudioResource, createAudioPlayer, NoSubscriberBehavior } from "@discordjs/voice";
import { VoiceBasedChannel, TextChannel, InteractionCollector, Message } from "discord.js";
import { metadata } from "../../types/musicType";
import { shuffle } from "../system/shuffle";
import { musicConnection } from "./musicExecuteConnection";
import { musicExecuteMsg } from "./musicExecuteMsg";
import { musicExecutePlayer } from "./musicExecutePlayer";
import { musicExecuteStreamResource } from "./musicExecuteStreamResource";
import { MusicOption } from "./musicOption";

export class MusicEntity {
  voiceChannel: VoiceBasedChannel;
  textChannel: TextChannel;
  reactCollector: InteractionCollector<any>;
  connection: VoiceConnection;
  subscription: PlayerSubscription;
  audioPlayer: AudioPlayer;
  playingSong: AudioResource<metadata>;
  songQueue: AudioResource<metadata>[];
  option: MusicOption;
  
  constructor(guildId:string, voiceChannel: VoiceBasedChannel, textChannel: TextChannel, resource: AudioResource<metadata>){
    this.voiceChannel = voiceChannel;
    this.textChannel = textChannel;
    this.audioPlayer = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });
    this.playingSong = resource;
    this.songQueue = [];
    this.option = new MusicOption();

    musicConnection(guildId);
    musicExecutePlayer(guildId, resource); //아래에 있는 play함수 호출
    musicExecuteMsg(guildId);
  }

  public async pushSongQueue(resource: AudioResource<metadata>){
    this.songQueue.push(resource);
    await this.textChannel.send(`${resource.metadata.title}가 큐에 들어왔어요~`);
  }

  public async skip(){
    this.audioPlayer.unpause();
    this.option.skip = true;
    this.subscription?.player.stop();
  }

  public async empty(){
    this.skip();
    this.songQueue = [];
  }

  public async show(msg:Message){
    const embedQueue = {
      color: 0xf7cac9,
      title: '큐에 들어간 노래 목록',
      description: `현재 재생중인 노래\n ${this.playingSong.metadata.title}`,
      fields:
        this.songQueue.map((e, i) => {
          return {
            name: '\u200b',
            value: `${i + 1}. ${e.metadata.title}`
          };
        })
    };

    await msg.channel.send({ embeds: [embedQueue] });
  }

  public async shuffle(msg:Message){
    shuffle(this.songQueue);
    msg.channel.send('큐에 들어간 곡이 무작위로 재배치되었습니다!');
    this.show(msg);
  }

  public async pause(msg:Message){
    const audioPlayer=this.audioPlayer;
    if (audioPlayer.state.status == 'playing') {
      audioPlayer.pause();
      await msg.channel.send('노래를 일시정지해 드렸어요!');
    } else {
      audioPlayer.unpause();
      await msg.channel.send('노래를 다시 재생합니다~');
    }
  }

  public async loop(msg:Message){
    const option = this.option;
    option.loop = !option.loop;
    if (!option.loop) await msg.channel.send('더이상 큐에 있던 녀석들이 반복되지 않아요!');
    else await msg.channel.send('큐 반복 기능이 활성화되었습니다~');
  }

  public async mute(msg:Message){
    const option = this.option;
    option.mute = !option.mute;
    this.playingSong.volume.setVolume(option.ampl * option.volume * Number(!option.mute));

    if (option.mute) await msg.channel.send(`음소거되었어요`);
    else await msg.channel.send(`원래 소리로 돌아갔어요.\n현재 볼륨:${Math.round(option.ampl * option.volume * 100)}%`);
  }

  public async setVolume(msg:Message, value:number){
    const option = this.option;

    if (option.mute) { msg.channel.send('음소거 중이에요.'); return; }
    option.volume = (Math.max(0, Math.min(1, value)));
    await msg.channel.send(`현재 볼륨:${Math.round(option.ampl * option.volume * 100)}%`);
  }
}

