<<<<<<< HEAD
import { TextChannel } from 'discord.js';

export const isUndefined = (variable: any, textChannel: TextChannel, msg: string) => {
  if (variable) return false;
  else {
    textChannel.send(msg);
    return true;
  }
};
=======
import { TextChannel } from "discord.js";

export const isUndefined = (variable:any, textChannel:TextChannel, msg:string) => {
    if(variable) return false;
    else {textChannel.send(msg); return true;}
}
>>>>>>> cbbf3d6f (music 리펙토링중 3)
