import { musicCollection } from '../../collection/musicCollection.js';
import { PermissionsBitField } from 'discord.js';

export const musicSetVolume = {
  name: '볼륨',
  cmd: ['볼륨', '소리', 'ㅂㄹ', 'ㅅㄹ'],
  type: 'music',
  permission: [PermissionsBitField.Flags.SendMessages],
  async execute(msg, args) {
    //Guard Clause
    const guildId = msg.guildId;
    const msgMember = msg.member;
    const textChannel = msg.channel;
    const musicEntity = musicCollection.get(guildId);

    if (!msgMember.voice.channel) {
      await textChannel.send('보이스채널에서 해주세요!');
      return;
    }

    if (!musicEntity?.connection) {
      await textChannel.send('재생하고 있는 노래가 없어요!');
      return;
    }

    if (msgMember.voice.channelId != musicEntity?.voiceChannel.id) {
      await textChannel.send('같은 보이스채널에서 해주세요!');
      return;
    }

    if (isNaN(Number(args[0]))) {
      await textChannel.send('값은 숫자로 넣어주세요!');
      return;
    }

    return new Promise(async (resolve, reject) => {
      try {
        musicEntity.setVolume(Math.round(Number(args[0])) / 100);
        resolve(undefined);
        return;
      } catch (error) {
        reject(error);
      }
    });
  }
};
