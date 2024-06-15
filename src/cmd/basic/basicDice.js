import { PermissionsBitField } from 'discord.js';

export const basicDice = {
  name: `주사위`,
  cmd: ['데굴', '데굴데굴', '주사위', 'ㄷㄱㄷㄱ'],
  type: 'basic',
  permission: [PermissionsBitField.Flags.SendMessages],
  async execute(msg) {
    return new Promise(async (resolve, reject) => {
      try {
        await msg.channel.send({
          content: `${msg.member.displayName}님의 주사위 결과입니다.\n> ${Math.ceil(Math.random() * 100)}`
        });

        resolve(undefined);
        return;
      } catch (error) {
        reject(error);
      }
    });
  }
};
