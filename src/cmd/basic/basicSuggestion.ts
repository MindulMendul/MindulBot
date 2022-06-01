<<<<<<< HEAD
<<<<<<< HEAD
import { Guild, TextChannel, User } from 'discord.js';
import { bot } from '../../../bot';
import { CMD } from '../../types/type';

export const basicSuggestion: CMD = {
  name: `건의`,
  cmd: ['건의'],
  type: 'basic',
  permission: [],
  execute(msg, args) {
    const guild = msg.guild as Guild;
    const channel = msg.channel as TextChannel;
    if (!args) return channel.send('공백은 건의할 수 없어요. 정당한 사항을 건의해주세요!');
    else {
      const content = args.join(' ');
      const OWNER_ID = process.env.OWNER_ID as string;
      const OWNER = bot.users.cache.get(OWNER_ID) as User;
      return OWNER.send(
        `'${guild.name}'길드의 '${channel.name}'채널에서 '${msg.author.username}'님이 건의사항 보내주셨어요.\n> ${content}`
      );
    }
  }
};
=======
import { Guild, TextChannel, User } from "discord.js";
import { bot } from "../../../bot";
import { cmd } from "../../type";

export const basicSuggestion: cmd = {
	name: `건의`,
	cmd: ['건의'],
	type: "basic",
	permission: [],
	execute(msg, args) {
		const guild = msg.guild as Guild;
		const channel = msg.channel as TextChannel;
		if (!args) return channel.send("공백은 건의할 수 없어요. 정당한 사항을 건의해주세요!");
		else {
			const content = args.join(" ");
			const OWNER_ID=process.env.OWNER_ID as string;
			const OWNER = bot.users.cache.get(OWNER_ID) as User;
			return OWNER.send(`'${guild.name}'길드의 '${channel.name}'채널에서 '${msg.author.username}'님이 건의사항 보내주셨어요.\n> ${content}`);
		}
	},
};
>>>>>>> 0aba8f5e (basic 명령어 모두 실행가능하도록 변경)
=======
import { Guild, TextChannel, User } from 'discord.js';
import { bot } from '../../../bot';
import { CMD } from '../../types/type';

export const basicSuggestion: CMD = {
  name: `건의`,
  cmd: ['건의'],
  type: 'basic',
  permission: [],
  execute(msg, args) {
    const guild = msg.guild as Guild;
    const channel = msg.channel as TextChannel;
    if (!args) return channel.send('공백은 건의할 수 없어요. 정당한 사항을 건의해주세요!');
    else {
      const content = args.join(' ');
      const OWNER_ID = process.env.OWNER_ID as string;
      const OWNER = bot.users.cache.get(OWNER_ID) as User;
      return OWNER.send(
        `'${guild.name}'길드의 '${channel.name}'채널에서 '${msg.author.username}'님이 건의사항 보내주셨어요.\n> ${content}`
      );
    }
  }
};
>>>>>>> beffa3af (코드 정렬툴 적용 및 디펜던시 업데이트)
