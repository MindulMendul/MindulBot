import { GuildMember } from 'discord.js';
import { CMD } from '../../types/type';
//import v8 from 'v8';

export const adminHeapSnapshot: CMD = {
  name: `힙스냅샷`,
  cmd: ['힙스냅샷'],
  type: 'basic',
  permission: ['MANAGE_MESSAGES'],
  async execute(msg) {
    const msgMember = msg.member as GuildMember;
    if (msgMember.user.id != process.env.OWNER_ID) return;

    //console.log(v8.writeHeapSnapshot("memorySnapshot.json"));
  }
};
