import { DiscordGatewayAdapterCreator, PlayerSubscription } from '@discordjs/voice';
import { NoSubscriberBehavior } from '@discordjs/voice';
import { joinVoiceChannel } from '@discordjs/voice';
import { createAudioPlayer } from '@discordjs/voice';

import { CMD } from '../../types/type';
import { musicCollection } from '../../../bot';
import { Guild, GuildMember, TextChannel } from 'discord.js';
import { VolumeTransformer } from 'prism-media';
import { musicExecuteStreamResource } from '../../hooks/music/musicExecuteStreamResource';
import { musicConnection } from '../../hooks/music/musicExecuteConnection';
import { musicSearch } from '../../hooks/music/musicSearch';

export const musicExecute: CMD = {
  name: '노래',
  cmd: ['노래', '시작', '선곡'],
  type: 'music',
  permission: ['CONNECT', 'SPEAK', 'READ_MESSAGE_HISTORY'], //링크 첨부는 뭐지?
  async execute(msg, args) {
    const guildId = msg.guildId as string;
    const msgMember = msg.member as GuildMember;

    //보이스채널 체크부분
    const voiceChannel = msgMember.voice.channel;
    if (!voiceChannel)//보이스채널 체크
      return msg.channel.send('보이스채널에서 해주세요!');

    //노래 검색부분
    const textChannel = msg.channel as TextChannel;
    const searched = (await musicSearch(msg, args, 1))?.pop();
    if(!searched) return; // 검색이 안 된 경우

    const searchedId = searched.id as string;
    const musicEntity = musicCollection.get(guildId);

    //Guild 체크해서 생성자가 존재하는지 확인하는 곳
    if (musicEntity) {
      //플레이어가 존재해서 큐에 넣으면 되는 상황
      if (msgMember.voice.channelId != voiceChannel.id)
        return msg.channel.send('같은 보이스채널에서 해주세요!');

      const resource = await musicExecuteStreamResource(searchedId);

      const option = musicEntity.option;
      const volume = resource.volume;
      volume?.setVolume((0.5 / option.volumeMagnification) * Number(!option.mute));
      musicEntity.songQueue.push(resource);

      msg.channel.send(`${resource.metadata.title}가 큐에 들어왔어요~`);
    } else {
      //플레이어가 존재하지 않아 최초로 노래를 틀어줘야 하는 상황
      const resource = await musicExecuteStreamResource(searchedId);

      const connection = joinVoiceChannel({
        //커넥션 생성
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator
      });

      const audioPlayer = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause
        }
      });

      const subscription = connection.subscribe(audioPlayer) as PlayerSubscription;
      const option = {
        volume: 0.5, // 0 ~ 1 사이의 값
        volumeMagnification: 6, // 1/n 배 되는 거라 커질 수록 소리가 작아짐
        mute: false,
        loop: false,
        skip: false
      };

      const volume = resource.volume as VolumeTransformer;
      volume.setVolume(0.5 / option.volumeMagnification); //노래 사운드 최초 설정해주는 곳

      musicCollection.set(guildId,
        {
          guild: msg.guild as Guild,
          voiceChannel: voiceChannel,
          textChannel: textChannel,
          connection: connection,
          subscription: subscription,
          audioPlayer: audioPlayer,
          playingSong: resource,
          songQueue: [],
          option: option
        }
      );
      
      musicConnection(guildId, resource);
    }
  }
};