import { NoSubscriberBehavior } from '@discordjs/voice';
import { createAudioPlayer } from '@discordjs/voice';

import { CMD } from '../../types/type';
import { musicCollection } from '../../../bot';
import { Guild, GuildMember, TextChannel } from 'discord.js';
import { VolumeTransformer } from 'prism-media';
import { musicExecuteStreamResource } from '../../hooks/music/musicExecuteStreamResource';
import { musicConnection } from '../../hooks/music/musicExecuteConnection';
import { musicSearch } from '../../hooks/music/musicSearch';
import { metadata } from '../../types/musicType';

export const musicExecute: CMD = {
  name: '노래',
  cmd: ['노래', '시작', '선곡'],
  type: 'music',
  permission: ['CONNECT', 'SPEAK', 'READ_MESSAGE_HISTORY'], //링크 첨부는 뭐지?
  async execute(msg, args) {
    //써야할 변수 모음
    const guildId = msg.guildId as string;
    const msgMember = msg.member as GuildMember;
    const textChannel = msg.channel as TextChannel;

    //보이스채널 체크부분
    const voiceChannel = msgMember.voice.channel;
    if (!voiceChannel) return textChannel.send('보이스채널에서 해주세요!');

    //검색어 체크부분
    if(!args?.length) return textChannel.send("검색어를 입력해주세요!");
    
    //노래 검색부분
    const searchedInfo = (await musicSearch(args?.join(" "), 1))?.pop();
    if (!searchedInfo) return textChannel.send('검색결과가 없어요 ㅠㅠ 다른 키워드로 다시 시도해보세요!'); // 검색이 안 된 경우
    
    const musicEntity = musicCollection.get(guildId);

    //Guild 체크해서 생성자가 존재하는지 확인하는 곳
    //플레이어가 존재해서 큐에 넣으면 되는 상황
    if (musicEntity) {      
      //같은 보이스채널인지 체크
      if (msgMember.voice.channelId != voiceChannel.id) return textChannel.send('같은 보이스채널에서 해주세요!');

      //노래 큐에 넣어주기
      const resource = await musicExecuteStreamResource(searchedInfo as metadata);
      const option = musicEntity.option;
      const volume = resource.volume;
      volume?.setVolume((option.volume / option.volumeMagnification) * Number(!option.mute));
      musicEntity.songQueue.push(resource);

      textChannel.send(`${resource.metadata.title}가 큐에 들어왔어요~`);
    }

    //플레이어가 존재하지 않아 최초로 노래를 틀어줘야 하는 상황
    else {
      //들어가야 하는 항목 전부 넣기
      const audioPlayer = createAudioPlayer({behaviors: {noSubscriber: NoSubscriberBehavior.Pause}});
      const option = {
        volume: 0.5, // 0 ~ 1 사이의 값
        volumeMagnification: 6, // 1/n 배 되는 거라 커질 수록 소리가 작아짐
        mute: false,
        loop: false,
        skip: false
      };
      const resource = await musicExecuteStreamResource(searchedInfo as metadata);
      const volume = resource.volume as VolumeTransformer;
      volume.setVolume(option.volume / option.volumeMagnification); //노래 사운드 최초 설정해주는 곳

      musicCollection.set(guildId, {
        guild: msg.guild as Guild,
        voiceChannel: voiceChannel,
        textChannel: textChannel,
        audioPlayer: audioPlayer,
        playingSong: resource,
        songQueue: [],
        option: option
      });

      musicConnection(guildId, resource);
    }
  }
};
