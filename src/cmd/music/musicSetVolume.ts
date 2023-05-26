import { CMD } from '../../types/type';
import { musicCollection } from '../../collection/musicCollection';
import { TextChannel } from 'discord.js';

export const musicSetVolume: CMD = {
  name: '볼륨',
  cmd: ['볼륨', '소리', 'ㅂㄹ', 'ㅅㄹ'],
  type: 'music',
  permission: [],
  async execute(msg, args) {
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
    
    return new Promise(async (resolve, reject)=>{
      musicEntity.setVolume(msg, Math.round(Number(args[0]))/100);
      resolve(undefined); return;
    });
  }
};