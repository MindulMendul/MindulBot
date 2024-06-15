import { PermissionsBitField } from 'discord.js';
import { musicCollection } from '../../collection/musicCollection.js';

export const musicSkip = {
  name: '스킵',
  cmd: ['스킵', '다음'],
  type: 'music',
  permission: [PermissionsBitField.Flags.SendMessages],
  async execute(msg) {
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

    if (msgMember.voice.channelId != musicEntity.voiceChannel.id) {
      await textChannel.send('같은 보이스채널에서 해주세요!');
      return;
    }

    return new Promise(async (resolve, reject) => {
      try {
        musicEntity.skip();
        resolve(undefined);
        return;
      } catch (error) {
        reject(error);
      }
    });
  }
};
