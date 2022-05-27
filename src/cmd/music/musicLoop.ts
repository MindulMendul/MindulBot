import { getVoiceConnection, getGroups } from '@discordjs/voice';
import { cmd } from '../../type';

export const musicLoop: cmd = {
  name: '루프',
  cmd: ['루프', '반복', 'loop', 'ㄿ', 'ㄹㅍ'],
  type: 'music',
  permission: [''],
  execute(msg) {
    if (!msg.member.voice.channel) return msg.channel.send('보이스채널에서 해주세요!');

    const connection = getVoiceConnection(msg.guild.id);
    if (!connection) return msg.channel.send('재생목록에 노래가 없어요!');

    if (msg.member.voice.channelId != connection.joinConfig.channelId)
      return msg.channel.send('같은 보이스채널에서 해주세요!');

    getGroups().get;
    const option = connection.subscription.option;
    option.loop = !option.loop;
    if (option.loop) msg.channel.send('큐 반복 기능이 활성화되었습니다~');
    else msg.channel.send('더이상 큐에 있던 녀석들이 반복되지 않아요!');
  }
};
