import { GuildMember, Message } from 'discord.js';
import { musicCollection } from '../../../bot';
import { CMD } from '../../types/type';

export const musicLoop: CMD = {
  name: '루프',
  cmd: ['루프', '반복', 'loop', 'ㄿ', 'ㄹㅍ'],
  type: 'music',
  permission: [],
  execute(msg: Message) {
    const guildId = msg.guildId as string;
    const musicEntity = musicCollection.get(guildId);
    const msgMember = msg.member as GuildMember;

    if (musicEntity == undefined)
      return msg.channel.send('노래 명령어를 먼저 입력해주세요!');

    if (!msgMember.voice.channel)
      return msg.channel.send('보이스채널에서 해주세요!');

    if (!musicEntity.connection)
      return msg.channel.send('재생목록에 노래가 없어요!');

    if (msgMember.voice.channelId != musicEntity.voiceChannel.id)
      return msg.channel.send('같은 보이스채널에서 해주세요!');

    const option = musicEntity.option;
    option.loop = !option.loop;
    if (option.loop) msg.channel.send('큐 반복 기능이 활성화되었습니다~');
    else msg.channel.send('더이상 큐에 있던 녀석들이 반복되지 않아요!');
  }
};
