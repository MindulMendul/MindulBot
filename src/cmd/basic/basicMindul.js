import { PermissionsBitField } from 'discord.js';

export const basicMindul = {
  name: `민둘`,
  cmd: ['민둘', 'alsenf', '민규', '민바'],
  type: 'basic',
  permission: [PermissionsBitField.Flags.SendMessages],
  async execute(msg) {
    return new Promise(async (resolve, reject) => {
      try {
        await msg.channel.send('민둘이는 바보');
        resolve(undefined);
        return;
      } catch (error) {
        reject(error);
      }
    });
  }
};
