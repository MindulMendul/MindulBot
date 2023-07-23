import { Message, TextChannel, User, VoiceBasedChannel } from 'discord.js';
import { CMD } from '../../types/type';
import { bot } from '../../../bot';
import textPERDicts from '../../assets/permissions/textPermissions.json' assert { type: 'json' };
import voicePERDicts from '../../assets/permissions/voicePermissions.json' assert { type: 'json' };

export const checkPERs = (msg: Message<boolean>, CMD: CMD) => {
  const PER = CMD.permission;
  if (!PER[0]) return [];

  const TextChannel = msg.channel as TextChannel;
  const VoiceChannel = msg.member.voice.channel;

  const textPERs = TextChannel.permissionsFor(bot.user as User);
  const voicePERs = VoiceChannel.permissionsFor(bot.user as User);

  if (!textPERs && !voicePERs) return [];

  return [
    ...PER.filter((elem) => !textPERs.has(elem) && textPERDicts[elem.toString()]).map(
      (elem) => `${textPERDicts[elem.toString()]}`
    ),
    ...PER.filter((elem) => !voicePERs.has(elem) && voicePERDicts[elem.toString()]).map(
      (elem) => `${voicePERDicts[elem.toString()]}`
    )
  ].join(', ');
};
