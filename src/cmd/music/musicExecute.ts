import { NoSubscriberBehavior } from '@discordjs/voice';
import { createAudioPlayer } from '@discordjs/voice';

import { CMD } from '../../types/type';
import { TextChannel, PermissionsBitField } from 'discord.js';
import { VolumeTransformer } from 'prism-media';
import { musicExecuteStreamResource } from '../../func/music/musicExecuteStreamResource';
import { musicConnection } from '../../func/music/musicExecuteConnection';
import { musicSearch } from '../../func/music/musicSearch';
import { metadata } from '../../types/musicType';
import { musicExecuteMsg } from '../../func/music/musicExecuteMsg';
import { musicExecutePlayer } from '../../func/music/musicExecutePlayer';
import { MusicEntity } from '../../func/music/musicEntity';
import { musicCollection } from '../../collection/musicCollection';
import { MusicOption } from '../../func/music/musicOption';

export const musicExecute: CMD = {
  name: '노래',
  cmd: ['노래', '시작', '선곡'],
  type: 'music',
  permission: [
    PermissionsBitField.Flags.Connect,
    PermissionsBitField.Flags.Speak,
    PermissionsBitField.Flags.ReadMessageHistory
  ],
  async execute(msg, args) {
    //써야할 변수 모음
    const guildId = msg.guildId;
    const msgMember = msg.member;
    const textChannel = msg.channel as TextChannel;
    const voiceChannel = msgMember.voice.channel;
    const musicEntity = musicCollection.get(guildId);

    //보이스채널 체크부분
    if (!voiceChannel){
      await textChannel.send('보이스채널에서 해주세요!');
      return;
    }

    //같은 보이스채널인지 체크
    if (musicEntity && voiceChannel.id != musicEntity?.voiceChannel.id){
      await textChannel.send('같은 보이스채널에서 해주세요!');
      return;
    }

    //검색어 체크부분
    if (!args?.length) {
      await textChannel.send('검색어를 입력해주세요!');
      return;
    }

    //노래 검색부분
    const searchedInfo = (await musicSearch(args?.join(' '), 1))?.pop() as metadata;
    if (!searchedInfo) {
      await textChannel.send('검색결과가 없어요 ㅠㅠ 다른 키워드로 다시 시도해보세요!'); // 검색이 안 된 경우
      return;
    }

    return new Promise(async (resolve, reject)=>{
      const resource = await musicExecuteStreamResource(searchedInfo);
      
      //플레이어가 존재해서 큐에 넣으면 되는 상황
      if (musicEntity) {
        await musicEntity?.pushSongQueue(resource);
        resolve(undefined); return;
      } else {
        //플레이어가 존재하지 않아 최초로 노래를 틀어줘야 하는 상황
        musicCollection.set(guildId, new MusicEntity(guildId, voiceChannel, textChannel, resource));
        resolve(undefined); return;
      }
    });
  }
};
