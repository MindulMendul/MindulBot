import { CMD } from '../../types/type';
import { musicCollection } from '../../../bot';
import { GuildMember } from 'discord.js';

export const musicEmpty: CMD = {
  name: '비우기',
  cmd: ['비우기', 'ㅂㅇㄱ'],
  type: 'music',
  permission: [],
  async execute(msg) {
    const guildId = msg.guildId as string;
    const musicEntity = musicCollection.get(guildId);
    const msgMember = msg.member as GuildMember;

    if (!musicEntity) return msg.channel.send('노래 명령어를 먼저 입력해주세요!');

    if (!msgMember.voice.channel) return msg.channel.send('보이스채널에서 해주세요!');

    if (!musicEntity.connection) return msg.channel.send('재생목록에 노래가 없어요!');

    if (msgMember.voice.channelId != musicEntity.voiceChannel.id)
      return msg.channel.send('같은 보이스채널에서 해주세요!');

    musicEntity.subscription.player.stop();
  }
};
