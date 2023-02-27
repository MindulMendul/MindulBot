import { CMD } from '../types/type';

const env = process.env as NodeJS.ProcessEnv;

export const testMsg: CMD = {
  name: `테스트`,
  cmd: ['테스트', 'ㅌㅅㅌ', 'ㅎ'],
  type: 'basic',
  permission: [],
  async execute(msg) {
    const OWNER_ID = env.OWNER_ID as string;
    if(msg.author.id!=OWNER_ID) return;

    return msg.channel.send('민둘이는 바보');
  }
};
