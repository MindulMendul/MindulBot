import { GuildMember } from 'discord.js';
import { musicCollection } from '../../../bot';
import { CMD } from '../../types/type';

export const test: CMD = {
  name: '테스트',
  cmd: ['테스트', 'ㅌㅅㅌ', 'ㅎ'],
  type: 'test',
  permission: [],
  async execute(msg) {
    const msgMember = msg.member as GuildMember;
    if (msgMember.user.id != process.env.OWNER_ID) return;

    const guildId=msg.guildId as string;
    console.log(musicCollection.get(guildId));
  }
};