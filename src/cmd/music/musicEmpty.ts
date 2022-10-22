<<<<<<< HEAD
<<<<<<< HEAD
import { CMD } from '../../types/type';
import { musicCollection } from '../../../bot';
import { GuildMember, TextChannel } from 'discord.js';

export const musicEmpty: CMD = {
=======
import { getVoiceConnection } from '@discordjs/voice';
import { cmd } from '../../types/type';

export const musicEmpty: cmd = {
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
=======
import { CMD } from '../../types/type';
import { musicCollection } from '../../../bot';
import { GuildMember, TextChannel } from 'discord.js';

export const musicEmpty: CMD = {
>>>>>>> af63370e (노래봇 작동은 하는데 왜 되는지는 모름)
  name: '비우기',
  cmd: ['비우기', 'ㅂㅇㄱ'],
  type: 'music',
  permission: [],
  async execute(msg) {
<<<<<<< HEAD
<<<<<<< HEAD
    const guildId = msg.guildId as string;
    const msgMember = msg.member as GuildMember;
    const textChannel = msg.channel as TextChannel;
    const musicEntity = musicCollection.get(guildId);

    if (!musicEntity) return textChannel.send('노래 명령어를 먼저 입력해주세요!');
    if (!msgMember.voice.channel) return textChannel.send('보이스채널에서 해주세요!');
    if (!musicEntity.connection) return textChannel.send('재생목록에 노래가 없어요!');
    if (msgMember.voice.channelId != musicEntity.voiceChannel.id)
      return textChannel.send('같은 보이스채널에서 해주세요!');

<<<<<<< HEAD
    musicEntity.songQueue=[];
    musicEntity.option.skip=true;
    musicCollection.set(guildId, musicEntity);

    musicEntity.subscription?.player.stop();
=======
    if (!msg.member.voice.channel) return msg.channel.send('보이스채널에서 해주세요!');
=======
    const guildId = msg.guildId as string;
    const msgMember = msg.member as GuildMember;
<<<<<<< HEAD
>>>>>>> af63370e (노래봇 작동은 하는데 왜 되는지는 모름)

    if (!musicEntity) return msg.channel.send('노래 명령어를 먼저 입력해주세요!');

    if (!msgMember.voice.channel) return msg.channel.send('보이스채널에서 해주세요!');

    if (!musicEntity.connection) return msg.channel.send('재생목록에 노래가 없어요!');

=======
    const textChannel = msg.channel as TextChannel;
    const musicEntity = musicCollection.get(guildId);
    
    if (!musicEntity) return textChannel.send('노래 명령어를 먼저 입력해주세요!');
    if (!msgMember.voice.channel) return textChannel.send('보이스채널에서 해주세요!');
    if (!musicEntity.connection) return textChannel.send('재생목록에 노래가 없어요!');
>>>>>>> 3ce689fd (노래 삭제기능 수정 & 노래 검색함수 수정 & 전체적인 리펙토링)
    if (msgMember.voice.channelId != musicEntity.voiceChannel.id)
      return textChannel.send('같은 보이스채널에서 해주세요!');

<<<<<<< HEAD
<<<<<<< HEAD
    connection.subscription.songs = [];
    connection.subscription.player.stop();
    connection.subscription.option.skip = true;
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
=======
    musicEntity.songs = [];
    musicEntity.subscription.player.stop();
    musicEntity.option.skip = true;
    
    musicCollection.set(guildId, musicEntity);
>>>>>>> af63370e (노래봇 작동은 하는데 왜 되는지는 모름)
=======
    musicEntity.subscription.player.stop();
>>>>>>> c7854135 (노래봇 버그 수정 (노래 끝나고 다시 노래 넣을 때 안 들어가던 거 수정))
=======
    musicEntity.subscription?.player.stop();
>>>>>>> 72fbb1b6 (music 부분 리펙토링 & 루프 기능 추가)
  }
};
