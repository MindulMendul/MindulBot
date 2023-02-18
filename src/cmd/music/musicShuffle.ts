import { GuildMember, Message, TextChannel } from 'discord.js';
import { musicCollection } from '../../../bot';
import { shuffle } from '../../hooks/system/shuffle';
import { CMD } from '../../types/type';
import { musicShow } from './musicShow';

export const musicShuffle: CMD = {
  name: '셔플',
  cmd: ['셔플', 'ㅅㅍ', 'shuffle'],
  type: 'music',
  permission: [],
  //shuffle 함수
  async execute(msg: Message) {
    const guildId = msg.guildId as string;
    const msgMember = msg.member as GuildMember;
    const textChannel = msg.channel as TextChannel;
    const musicEntity = musicCollection.get(guildId);

    if (!musicEntity) return textChannel.send('노래 명령어를 먼저 입력해주세요!');
    if (!msgMember.voice.channel) return textChannel.send('보이스채널에서 해주세요!');
    if (!musicEntity.connection) return textChannel.send('재생목록에 노래가 없어요!');
    if (msgMember.voice.channelId != musicEntity.voiceChannel.id)
      return textChannel.send('같은 보이스채널에서 해주세요!');

    shuffle(musicEntity.songQueue);
    textChannel.send('큐에 들어간 곡이 무작위로 재배치되었습니다!');
    if (musicShow.execute) musicShow.execute(msg);
  }
};
