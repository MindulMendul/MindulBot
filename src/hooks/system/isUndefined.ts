import { TextChannel } from 'discord.js';

export const isUndefined = (variable: any, textChannel: TextChannel, msg: string) => {
  if (variable) return false;
  else {
    textChannel.send(msg);
    return true;
  }
};
