import { getVoiceConnection } from '@discordjs/voice';
import { cmd } from '../../type';

export const musicShuffle: cmd = {
  name: '셔플',
  cmd: ['셔플', 'ㅅㅍ', 'shuffle'],
  type: 'music',
  permission: [],
  //shuffle 함수
  async execute(msg) {
    if (!msg.member.voice.channel) return msg.channel.send('보이스채널에서 해주세요!');

    const func = require('./../../func.js');
    const connection = getVoiceConnection(msg.guild.id);
    if (!connection) return msg.channel.send('재생목록에 노래가 없어요!');

    if (msg.member.voice.channelId != connection.joinConfig.channelId)
      return msg.channel.send('같은 보이스채널에서 해주세요!');

    func.shuffle(connection.subscription.songs);
    msg.channel.send('큐에 들어간 곡이 무작위로 재배치되었습니다!');
    require('./musicShow').execute(msg);
  }
};
