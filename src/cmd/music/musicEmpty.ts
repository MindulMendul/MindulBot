import { CMD } from '../../types/type';
import { musicCollection } from '../../collection/musicCollection';
import { TextChannel } from 'discord.js';

export const musicEmpty: CMD = {
  name: '비우기',
  cmd: ['비우기', 'ㅂㅇㄱ'],
  type: 'music',
  permission: [],
  async execute(msg) {
    //Guard Clause
    const guildId = msg.guildId;
    const msgMember = msg.member;
    const textChannel = msg.channel as TextChannel;
    const musicEntity = musicCollection.get(guildId);
    
    if (!msgMember.voice.channel){
      await textChannel.send('보이스채널에서 해주세요!');
      return;
    }
    
    if (!musicEntity?.connection){
      await textChannel.send('재생하고 있는 노래가 없어요!');
      return;
    }
    
    if (msgMember.voice.channelId != musicEntity?.voiceChannel.id){
      await textChannel.send('같은 보이스채널에서 해주세요!');
      return;
    }
    
    return new Promise(async (resolve, reject)=>{ try {
      musicEntity.empty();
      resolve(undefined); return;
    } catch(e) {reject(e)} });
  }
};
