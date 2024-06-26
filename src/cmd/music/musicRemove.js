import { effectiveArr } from './../../func/system/effectiveArr.js';
import { musicRemoveCollector } from '../../collector/musicRemoveCollector.js';
import { PermissionsBitField } from 'discord.js';
import { musicCollection } from '../../collection/musicCollection.js';

export const musicRemove = {
  name: '제거',
  cmd: ['제거', '삭제', 'ㅈㄱ', 'ㅅㅈ'],
  type: 'music',
  permission: [PermissionsBitField.Flags.SendMessages],
  async execute(msg, args) {
    //Guard Clause
    const guildId = msg.guildId;
    const msgMember = msg.member;
    const textChannel = msg.channel;
    const musicEntity = musicCollection.get(guildId);
    const argsArr = effectiveArr(args?.join(' '), 1, musicEntity?.songQueue.length);

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

    if (!musicEntity?.songQueue.length) {
      await textChannel.send('대기열에 노래가 없어요, 대기열을 확인해주세요!');
      return;
    }

    if (argsArr.length == 0) {
      await textChannel.send('어떤 곡을 지울지 모르겠어요!');
      return;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const tempStr =
          '해당 노래가 맞아요?\n\n' +
          argsArr.map((e) => `> ${e}. **${musicEntity.songQueue[e - 1].metadata.title}**`).join('\n') +
          '\n\n맞으면 **네**, 아니라면 그 밖에 **아무 말**이나 하세요.\n**10초**의 시간동안 아무런 말이 없다면 자동으로 명령이 취소됩니다!';
        await textChannel.send(tempStr);

        //콜렉터 부분
        const filter = (i) => !i.author.bot && i.author.id === msg.author.id;
        await musicRemoveCollector(msg, args, { filter, time: 10000 });
        resolve(undefined);
        return;
      } catch (error) {
        reject(error);
      }
    });
  }
};
