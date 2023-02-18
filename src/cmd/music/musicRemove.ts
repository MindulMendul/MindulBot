import { effectiveArr } from './../../hooks/system/effectiveArr';
import { CMD } from '../../types/type';
import { musicRemoveReact } from '../../hooks/music/musicRemoveReact';
import { GuildMember, TextChannel } from 'discord.js';
import { musicCollection } from '../../../bot';

export const musicRemove: CMD = {
  name: '제거',
  cmd: ['제거', '삭제', 'ㅈㄱ', 'ㅅㅈ'],
  type: 'music',
  permission: [],
  //remove 함수
  async execute(msg, args) {
    const guildId = msg.guildId as string;
    const msgMember = msg.member as GuildMember;
    const textChannel = msg.channel as TextChannel;
    const musicEntity = musicCollection.get(guildId);

    if (!musicEntity) return textChannel.send('노래 명령어를 먼저 입력해주세요!');
    if (!msgMember.voice.channel) return textChannel.send('보이스채널에서 해주세요!');
    if (!musicEntity.connection) return textChannel.send('재생목록에 노래가 없어요!');
    if (msgMember.voice.channelId != musicEntity.voiceChannel.id)
      return textChannel.send('같은 보이스채널에서 해주세요!');

    const { songQueue } = musicEntity;

    if (!songQueue.length) return textChannel.send('대기열에 노래가 없어요, 대기열을 확인해주세요!');

    if (!args) return textChannel.send('어떤 곡을 지울지 모르겠어요!');
    const argsArr = effectiveArr(args?.join(' '), 1, songQueue.length); //배열이 유효한지 조사
    if (argsArr.length == 0) return textChannel.send('어떤 곡을 지울지 모르겠어요!');

    const tempStr =
      '해당 노래가 맞아요?\n' +
      argsArr
        .map((e) => {
          return `> **${e}. ${musicEntity.songQueue[e - 1].metadata.title}**`;
        })
        .join('\n') +
      '7초의 시간을 드릴 거에요!\n맞으면 네, 아니라면 그 밖에 아무 말이나 하세요.';
    await textChannel.send(tempStr);

    musicRemoveReact(guildId, msg.author.id, argsArr);
  }
};
