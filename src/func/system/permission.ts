import { Message, TextChannel, User } from 'discord.js';
import { CMD } from '../../types/type';
import { bot } from '../../../bot';
export const checkPERs = (msg: Message<boolean>, CMD: CMD) => {
  const PER = CMD.permission;
  if (!PER[0]) return [];

  const channel = msg.channel as TextChannel;
  const PERs = channel.permissionsFor(bot.user as User);
  if (!PERs) return [];

  return PER.filter((elem) => !PERs.has(elem))
    .map((elem) => `> ${elem} : ${PERs.has(elem)}`)
    .join('\n');
};
