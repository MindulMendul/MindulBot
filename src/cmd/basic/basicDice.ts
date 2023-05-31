import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { TextChannel } from 'discord.js';
import { CMD } from '../../types/type';

export const basicDice: CMD = {
  name: `주사위`,
  cmd: ['데굴', '데굴데굴', '주사위', 'ㄷㄱㄷㄱ'],
  type: 'basic',
  permission: [],
  async execute(msg) {
    return new Promise(async (resolve, reject) => {
      try {
        await msg.channel.send({
          content: `${msg.member.displayName}님의 주사위 결과입니다.\n> ${Math.ceil(Math.random() * 6)}`
        });

        resolve(undefined);
        return;
      } catch (error) {
        reject(error);
      }
    });
  }
};
