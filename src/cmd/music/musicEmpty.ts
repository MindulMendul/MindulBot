<<<<<<< HEAD
import { CMD } from '../../types/type';
import { musicCollection } from '../../../bot';
import { GuildMember, TextChannel } from 'discord.js';

export const musicEmpty: CMD = {
=======
import { getVoiceConnection } from '@discordjs/voice';
import { cmd } from '../../type';

export const musicEmpty: cmd = {
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
  name: '비우기',
  cmd: ['비우기', 'ㅂㅇㄱ'],
  type: 'music',
  permission: [],
  async execute(msg) {
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

    musicEntity.songQueue=[];
    musicEntity.option.skip=true;
    musicCollection.set(guildId, musicEntity);

    musicEntity.subscription?.player.stop();
=======
    if (!msg.member.voice.channel) return msg.channel.send('보이스채널에서 해주세요!');

    const connection = getVoiceConnection(msg.guild.id);
    if (!connection) return msg.channel.send('재생목록에 노래가 없어요!');

    if (msg.member.voice.channelId != connection.joinConfig.channelId)
      return msg.channel.send('같은 보이스채널에서 해주세요!');

    connection.subscription.songs = [];
    connection.subscription.player.stop();
    connection.subscription.option.skip = true;
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
  }
};
