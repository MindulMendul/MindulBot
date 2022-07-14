import { effectiveArr } from './../../hooks/system/effectiveArr';
import { CMD } from '../../types/type';
import { musicRemoveReact } from '../../hooks/music/musicRemoveReact';
import { musicCollection } from '../../../bot';
import { musicEntity } from '../../types/musicType';

export const musicRemove: CMD = {
  name: '제거',
  cmd: ['제거', '삭제', 'ㅈㄱ', 'ㅅㅈ'],
  type: 'music',
  permission: [],
  //remove 함수
  async execute(msg, args) {
    const guildId = msg.guildId as string;
    const musicEntity = musicCollection.get(guildId) as musicEntity;
    const msgMemberVoice = msg.member?.voice;

    const { connection, songQueue } = musicEntity;

    if (musicEntity == undefined) return msg.channel.send('노래 명령어를 먼저 입력해주세요!');

    if (!msgMemberVoice?.channel) return msg.channel.send('보이스채널에서 해주세요!');

    if (!connection) return msg.channel.send('재생목록에 노래가 없어요!');

    if (msgMemberVoice?.channelId != musicEntity.voiceChannel.id)
      return msg.channel.send('같은 보이스채널에서 해주세요!');

    if (!songQueue.length)
      return msg.channel.send('대기열에 노래가 없어요, 대기열을 확인해주세요!');
    
    if(!args) return msg.channel.send('어떤 곡을 지울지 모르겠어요!');
    const argsArr = effectiveArr(args?.join(' '), 1, songQueue.length); //배열이 유효한지 조사
    if (argsArr.length == 0) return msg.channel.send('어떤 곡을 지울지 모르겠어요!');

    const tempStr = '해당 노래가 맞아요?\n'
    +argsArr.map((e) => {
      return `> **${e}. ${musicEntity.songQueue[e-1].metadata.title}**`;
    }).join('\n')+'7초의 시간을 드릴 거에요!\n맞으면 네, 아니라면 그 밖에 아무 말이나 하세요.';
    await msg.channel.send(tempStr);

    musicRemoveReact(guildId, msg.author.id, argsArr);
  }
};
