<<<<<<< HEAD
<<<<<<< HEAD
import { GuildMember, TextChannel } from 'discord.js';
import { musicCollection } from '../../../bot';
import { CMD } from '../../types/type';

export const musicSkip: CMD = {
  name: '스킵',
  cmd: ['스킵', '다음'],
  type: 'music',
  permission: [],
  async execute(msg) {
    const guildId = msg.guildId as string;
<<<<<<< HEAD
    const msgMember = msg.member as GuildMember;
    const textChannel = msg.channel as TextChannel;
    const musicEntity = musicCollection.get(guildId);

    if (!musicEntity) return textChannel.send('노래 명령어를 먼저 입력해주세요!');
    if (!msgMember.voice.channel) return textChannel.send('보이스채널에서 해주세요!');
    if (!musicEntity.connection) return textChannel.send('재생목록에 노래가 없어요!');
    if (msgMember.voice.channelId != musicEntity.voiceChannel.id)
      return textChannel.send('같은 보이스채널에서 해주세요!');
    
    musicEntity.option.skip = true;
    musicEntity.subscription?.player.stop();
=======
import { getVoiceConnection } from '@discordjs/voice';
import { GuildMember } from 'discord.js';
=======
import { GuildMember, TextChannel } from 'discord.js';
>>>>>>> 3ce689fd (노래 삭제기능 수정 & 노래 검색함수 수정 & 전체적인 리펙토링)
import { musicCollection } from '../../../bot';
import { CMD } from '../../types/type';

export const musicSkip: CMD = {
  name: '스킵',
  cmd: ['스킵', '다음'],
  type: 'music',
  permission: [],
  async execute(msg) {
    const guildId = msg.guildId as string;
    const musicEntity = musicCollection.get(guildId);
=======
>>>>>>> 72fbb1b6 (music 부분 리펙토링 & 루프 기능 추가)
    const msgMember = msg.member as GuildMember;
    const textChannel = msg.channel as TextChannel;
    const musicEntity = musicCollection.get(guildId);

    if (!musicEntity) return textChannel.send('노래 명령어를 먼저 입력해주세요!');
    if (!msgMember.voice.channel) return textChannel.send('보이스채널에서 해주세요!');
    if (!musicEntity.connection) return textChannel.send('재생목록에 노래가 없어요!');
    if (msgMember.voice.channelId != musicEntity.voiceChannel.id)
      return textChannel.send('같은 보이스채널에서 해주세요!');

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    connection.subscription.player.stop();
    connection.subscription.option.skip = true;
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
=======
      musicEntity.subscription.player.stop();
      musicEntity.option.skip = true;
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
=======
    musicEntity.subscription.player.stop();
=======
    musicEntity.subscription?.player.stop();
>>>>>>> 72fbb1b6 (music 부분 리펙토링 & 루프 기능 추가)
    musicEntity.option.skip = true;
>>>>>>> c7854135 (노래봇 버그 수정 (노래 끝나고 다시 노래 넣을 때 안 들어가던 거 수정))
  }
};
