<<<<<<< HEAD
<<<<<<< HEAD
import { effectiveArr } from './../../hooks/system/effectiveArr';
import { CMD } from '../../types/type';
import { musicRemoveReact } from '../../hooks/music/musicRemoveReact';
<<<<<<< HEAD
import { musicCollection } from '../../../bot';
import { musicEntity } from '../../types/musicType';
import { GuildMember, TextChannel } from 'discord.js';

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
        .map((e) => { return `> **${e}. ${musicEntity.songQueue[e - 1].metadata.title}**`; })
        .join('\n') +
      '7초의 시간을 드릴 거에요!\n맞으면 네, 아니라면 그 밖에 아무 말이나 하세요.';
    await textChannel.send(tempStr);

    musicRemoveReact(guildId, msg.author.id, argsArr);
=======
import { getVoiceConnection } from '@discordjs/voice';
import { effectiveArr } from './../../hooks/app/effectiveArr';
import { cmd } from '../../types/type';
=======
import { effectiveArr } from './../../hooks/system/effectiveArr';
import { CMD } from '../../types/type';
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
import { musicRemoveReact } from '../../hooks/music/musicRemoveReact';
import { GuildMember } from 'discord.js';
=======
>>>>>>> cbbf3d6f (music 리펙토링중 3)
import { musicCollection } from '../../../bot';
import { musicEntity } from '../../types/musicType';
import { GuildMember, TextChannel } from 'discord.js';

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
        .map((e) => { return `> **${e}. ${musicEntity.songQueue[e - 1].metadata.title}**`; })
        .join('\n') +
      '7초의 시간을 드릴 거에요!\n맞으면 네, 아니라면 그 밖에 아무 말이나 하세요.';
    await textChannel.send(tempStr);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    this.react(msg, argsArr, connection);
  },
  async react(msg: any, args: any, connection: any) {
    const correctArr = ['네', '어', 'ㅇㅋ', 'ㅇㅇ', 'ㅇ', 'd', 'D', 'y', 'Y', '알았어', 'dz', 'dd', '얍', '0'];

    //콜렉터 부분
    const filter = (message: { author: { bot: any; id: any } }) => {
      return !message.author.bot && message.author.id === msg.author.id;
    };
    const collector = msg.channel.createMessageCollector({ filter, max: 1, time: 7000 });
    collector.on('collect', async (msg: { content: string; channel: { send: (arg0: string) => void } }) => {
      if (correctArr.includes(msg.content)) {
        //긍정
        args
          .sort((a: number, b: number) => {
            return b - a;
          })
          .forEach((element: any) => {
            connection.subscription.songs.splice(element, 1);
          });
        await msg.channel.send('삭제 완료!');
        require('./musicShow').execute(msg); //큐에 남아있는 노래가 있다면 보여주기
      } //부정
      else msg.channel.send('부정의 의미로 받아들이고, 그대로 내버려둘게요.');
    });

    collector.on('end', (collected: { first: () => any }) => {
      if (!collected.first()) msg.channel.send('대답이 따로 없으니까 그냥 내비둘게요~');
    });
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
=======
    musicRemoveReact(msg, argsArr, connection);
>>>>>>> 92fc5a7c (music 부분 고치는 중)
=======
    musicRemoveReact(msg, argsArr, musicEntity.connection);
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
=======
    musicRemoveReact(msg, argsArr, musicEntity);
>>>>>>> 254ee395 (노래봇 진짜 제대로 고친 것 같은데...?? (희망사항))
=======
    musicRemoveReact(guildId, msg.author.id, argsArr);
>>>>>>> cbbf3d6f (music 리펙토링중 3)
  }
};
