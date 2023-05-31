import { resolveColor, TextChannel } from 'discord.js';
import { getOWNER } from '../../func/system/owner';
import { CMD } from '../../types/type';

export const basicSuggestion: CMD = {
  name: `건의`,
  cmd: ['건의'],
  type: 'basic',
  permission: [],
  async execute(msg, args) {
    if (args.length == 0) {
      await msg.channel.send('공백은 건의할 수 없어요. 정당한 사항을 건의해주세요!');
      return;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const channel = msg.channel as TextChannel;
        await getOWNER().send(
          `'${msg.guild.name}'길드의 '${channel.name}'채널에서 '${
            msg.author.username
          }'님이 건의사항 보내주셨어요.\n> ${args.join(' ')}`
        );

        resolve(undefined);
        return;
      } catch (error) {
        reject(error);
      }
    });
  }
};
