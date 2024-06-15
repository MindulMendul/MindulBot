import { bot } from '../../../bot.js';
import textPERDicts from '../../assets/permissions/textPermissions.json' assert { type: 'json' };
import voicePERDicts from '../../assets/permissions/voicePermissions.json' assert { type: 'json' };

export const checkPERs = (msg, CMD) => {
  const PER = CMD.permission;
  if (!PER[0]) return [];

  const TextChannel = msg.channel;
  const VoiceChannel = msg.member.voice.channel;

  const textPERs = TextChannel.permissionsFor(bot.user);
  const voicePERs = VoiceChannel?.permissionsFor(bot.user);

  if (!textPERs && !voicePERs) return [];

  return [
    ...PER.filter((elem) => !textPERs.has(elem) && textPERDicts[elem.toString()]).map(
      (elem) => `채팅 채널: ${textPERDicts[elem.toString()]}`
    ),
    ...PER.filter((elem) => !voicePERs?.has(elem) && voicePERDicts[elem.toString()]).map(
      (elem) => `음성 채널: ${voicePERDicts[elem.toString()]}`
    )
  ].join(', ');
};
