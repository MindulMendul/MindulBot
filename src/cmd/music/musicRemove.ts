import { effectiveArr } from './../../hooks/system/effectiveArr';
import { CMD } from '../../types/type';
import { musicRemoveReact } from '../../hooks/music/musicRemoveReact';
import { GuildMember } from 'discord.js';
import { musicCollection } from '../../../bot';

export const musicRemove: CMD = {
  name: '제거',
  cmd: ['제거', '삭제', 'ㅈㄱ', 'ㅅㅈ'],
  type: 'music',
  permission: [],
  //remove 함수
  async execute(msg, args) {
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

    const argsArr = await effectiveArr(args.join(","), ',', 1, musicEntity.songs.length); //배열이 유효한지 조사
    if (argsArr.length == 0) return msg.channel.send('어떤 곡을 지울지 모르겠어요!');

    let tempStr = '해당 노래가 맞아요?\n';
    argsArr.forEach((e) => {
      tempStr += `> **${e + 1}. ${musicEntity.songs[e].metadata.title}**\n`;
    });
    tempStr += '7초의 시간을 드릴 거에요!\n맞으면 네, 아니라면 그 밖에 아무 말이나 하세요.';
    await msg.channel.send(tempStr);

    musicRemoveReact(msg, argsArr, musicEntity);
  }
};