import { GuildMember } from 'discord.js';
import { musicCollection } from '../../../bot';
import { CMD } from '../../types/type';

export const musicShow: CMD = {
  name: '큐',
  cmd: ['큐', '목록', '노래목록'],
  type: 'music',
  permission: [],
  async execute(msg) {
    const guildId = msg.guildId as string;
    const musicEntity = musicCollection.get(guildId);
    const msgMember = msg.member as GuildMember;

    if (musicEntity == undefined) return msg.channel.send('노래 명령어를 먼저 입력해주세요!');

    if (!msgMember.voice.channel) return msg.channel.send('보이스채널에서 해주세요!');

    if (!musicEntity.connection) return msg.channel.send('재생목록에 노래가 없어요!');

    if (msgMember.voice.channelId != musicEntity.voiceChannel.id)
      return msg.channel.send('같은 보이스채널에서 해주세요!');

    const fields = musicEntity.songs.map((e, i) => {
      return {
        name: '\u200b',
        value: `${i + 1}. ${e.metadata.title}`
      };
    });

    const embedQueue = {
      color: 0xf7cac9,
      title: '큐에 들어간 노래 목록',
      description: `현재 재생중인 노래\n ${musicEntity.song.metadata.title}`,
      fields: fields
    };

    return msg.channel.send({ embeds: [embedQueue] });
  }
};
