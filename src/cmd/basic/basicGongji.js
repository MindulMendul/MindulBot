import { bot } from '../../../bot.js';
import { PermissionsBitField } from 'discord.js';

export const basicGongji = {
  name: `공지`,
  cmd: ['공지'],
  type: 'basic',
  permission: [PermissionsBitField.Flags.SendMessages],
  async execute(msg, args) {
    if (msg.author.id != process.env.OWNER_ID) return;

    return new Promise(async (resolve, reject) => {
      try {
        bot.guilds.cache.forEach(async (g) => {
          const ch = g.channels.cache.find((channel) => {
            //서버 이름 찾기
            const name = channel.name.toLowerCase();
            console.log(`${name}: ${name.includes('mindul') || name.includes('민둘')}`);
            return name.includes('mindul') || name.includes('민둘'); //공지 메시지 보내기
          });

          await ch?.send(args.join(' '));
        });

        resolve(undefined);
        return;
      } catch (error) {
        reject(error);
      }
    });
  }
};
