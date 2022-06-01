import { getVoiceConnection } from '@discordjs/voice';
import { effectiveArr } from './../../hooks/app/effectiveArr';
import { cmd } from '../../types/type';
import { musicRemoveReact } from '../../hooks/music/musicRemoveReact';

export const musicRemove: cmd = {
  name: '제거',
  cmd: ['제거', '삭제', 'ㅈㄱ', 'ㅅㅈ'],
  type: 'music',
  permission: [],
  //remove 함수
  async execute(msg, args) {
    if (!msg.member.voice.channel) return msg.channel.send('보이스채널에서 해주세요!');

    const connection = getVoiceConnection(msg.guild.id);
    if (!connection) return msg.channel.send('재생목록에 노래가 없어요!');

    if (msg.member.voice.channelId != connection.joinConfig.channelId)
      return msg.channel.send('같은 보이스채널에서 해주세요!');

    const argsArr = await effectiveArr(args.toString(), ',', 1, connection.subscription.songs.length); //배열이 유효한지 조사
    if (argsArr.length == 0) return msg.channel.send('어떤 곡을 지울지 모르겠어요!');

    let tempStr = '해당 노래가 맞아요?\n';
    argsArr.forEach((element) => {
      tempStr += `> **${element + 1}. ${connection.subscription.songs[element].metadata.title}**\n`;
    });
    tempStr += '7초의 시간을 드릴 거에요!\n맞으면 네, 아니라면 그 밖에 아무 말이나 하세요.';
    await msg.channel.send(tempStr);

    musicRemoveReact(msg, argsArr, connection);
  }
};
