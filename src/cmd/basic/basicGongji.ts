import { CMD } from '../../types/type';
import { bot } from '../../../bot';
import { Guild, TextChannel } from 'discord.js';

export const basicGongji: CMD = {
  name: `공지`,
  cmd: ['공지'],
  type: 'basic',
  permission: [],
  async execute(msg, args) {
    return new Promise(async (resolve, reject) => {
      try {
        bot.guilds.cache.forEach(async (g) => {
          const ch = g.channels.cache.find((channel) => {
            //서버 이름 찾기
            const name = channel.name.toLowerCase();
            return name.includes('mindul') || name.includes('민둘'); //공지 메시지 보내기
          }) as TextChannel;
          await ch.send(args[2]);
        });

        resolve(undefined);
        return;
      } catch (e) {
        reject(e);
      }
    });
  }
};
