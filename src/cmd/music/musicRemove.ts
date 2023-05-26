import { effectiveArr } from './../../func/system/effectiveArr';
import { CMD } from '../../types/type';
import { musicRemoveCollector } from '../../collector/musicRemoveCollector';
import { TextChannel } from 'discord.js';
import { musicCollection } from '../../collection/musicCollection';

export const musicRemove: CMD = {
  name: '제거',
  cmd: ['제거', '삭제', 'ㅈㄱ', 'ㅅㅈ'],
  type: 'music',
  permission: [],
  async execute(msg, args) {
    //Guard Clause
    const guildId = msg.guildId;
    const msgMember = msg.member;
    const textChannel = msg.channel as TextChannel;
    const musicEntity = musicCollection.get(guildId);
    const argsArr = effectiveArr(args?.join(' '), 1, musicEntity?.songQueue.length);

    if (!msgMember.voice.channel){
      await textChannel.send('보이스채널에서 해주세요!');
      return;
    }
    
    if (!musicEntity?.connection){
      await textChannel.send('재생하고 있는 노래가 없어요!');
      return;
    }
    
    if (msgMember.voice.channelId != musicEntity.voiceChannel.id){
      await textChannel.send('같은 보이스채널에서 해주세요!');
      return;
    }

    if (!musicEntity?.songQueue.length) {
      await textChannel.send('대기열에 노래가 없어요, 대기열을 확인해주세요!');
      return;
    }
    
    if (argsArr.length == 0){
      await textChannel.send('어떤 곡을 지울지 모르겠어요!');
      return;
    }

    return new Promise(async (resolve, reject)=>{
      const tempStr =
        '해당 노래가 맞아요?\n\n' +
        argsArr.map((e) => `> **${e}. ${musicEntity.songQueue[e - 1].metadata.title}**`).join('\n') +
        '\n\n7초의 시간을 드릴 거에요!\n맞으면 네, 아니라면 그 밖에 아무 말이나 하세요.';
      await textChannel.send(tempStr);
      
      //콜렉터 부분
      const filter = (i:any) => !i.author.bot && i.user.id === msg.author.id;
      await musicRemoveCollector(msg, args, { filter, max: 1, time: 7000 });
      resolve(undefined); return;
    });
  }
};
