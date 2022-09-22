import { search } from 'play-dl';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { effectiveArr } from './../../hooks/system/effectiveArr';
import { CMD } from '../../types/type';
import { GuildMember, Message, TextChannel, VoiceChannel } from 'discord.js';
import { musicExecute } from './musicExecute';
import { musicSearch } from '../../hooks/music/musicSearch';
import { bot, musicCollection } from '../../../bot';
import { musicEntity } from '../../types/musicType';

export const musicYoutubeSearch: CMD = {
=======
import { effectiveArr } from './../../func/effectiveArr';
import { cmd } from '../../type';
=======
import { effectiveArr } from './../../hooks/app/effectiveArr';
import { cmd } from '../../types/type';
>>>>>>> af63370e (노래봇 작동은 하는데 왜 되는지는 모름)

export const musicYoutubeSearch: cmd = {
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
=======
import { effectiveArr } from './../../hooks/system/effectiveArr';
import { CMD } from '../../types/type';
import { GuildMember, Message, TextChannel, VoiceChannel } from 'discord.js';
import { musicExecute } from './musicExecute';
import { musicSearch } from '../../hooks/music/musicSearch';

export const musicYoutubeSearch: CMD = {
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
  name: '검색',
  cmd: ['검색', '노래검색', 'ㄴㄹㄱㅅ', 'ㄴㄺㅅ'],
  type: 'music',
  permission: ['CONNECT', 'SPEAK', 'MANAGE_EMOJIS_AND_STICKERS', 'READ_MESSAGE_HISTORY', 'MANAGE_MESSAGES'],
  //찾은 유튜브 주소를 배열에 집어넣는 함수
  async execute(msg, args) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    const guildId = msg.guildId as string;
=======
>>>>>>> cb4347e6 (자잘한 코드 변경 (아주 조금 최적화))
    const msgMember = msg.member as GuildMember;
    const textChannel = msg.channel as TextChannel;
    const musicEntity = musicCollection.get(guildId);

<<<<<<< HEAD
    //보이스채널 체크부분
    if (!msgMember.voice.channel) return textChannel.send('보이스채널에서 해주세요!');
=======
    if (!msgMember.voice.channel) return textChannel.send('보이스채널에서 해주세요!');

    if (msgMember.voice.channel.id != voiceChannel.id) return textChannel.send('같은 보이스채널에서 해주세요!');
>>>>>>> a468518a (pretter 적용)

<<<<<<< HEAD
    //검색어 체크부분
    if (!args?.length) return textChannel.send("검색어를 입력해주세요!");

    //같은 보이스채널인지 체크
    if (musicEntity && msgMember.voice.channelId != musicEntity.voiceChannel.id)
      textChannel.send('같은 보이스채널에서 해주세요!');

    const items = await musicSearch(args?.join(" "), 8);
    if (!items) return textChannel.send('어떤 곡을 찾아야 할지 모르겠어요!'); // 검색이 안 된 경우
=======
    const items = await musicSearch(msg, 8, args);
<<<<<<< HEAD
    if(!args || !items) return msg.channel.send('어떤 곡을 찾아야 할지 모르겠어요!'); // 검색이 안 된 경우
>>>>>>> cb4347e6 (자잘한 코드 변경 (아주 조금 최적화))
=======
    if (!args || !items) return msg.channel.send('어떤 곡을 찾아야 할지 모르겠어요!'); // 검색이 안 된 경우
>>>>>>> a468518a (pretter 적용)

    //임베드 만들기
    const fields = items.map((e, i) => {
      return {
        name: '\u200b',
        value: `[${i + 1}. ${e.title}](${e.url})`, //markdown 사용
        url: e.url
      };
    });
=======
    if (!msg.member.voice.channel) return msg.channel.send('보이스채널에서 해주세요!');
=======
    const guildId = msg.guildId as string;
    const msgMember = msg.member as GuildMember;
<<<<<<< HEAD
<<<<<<< HEAD
    
    if (!msgMember.voice.channel)
      return msg.channel.send('보이스채널에서 해주세요!');
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
=======
>>>>>>> c7854135 (노래봇 버그 수정 (노래 끝나고 다시 노래 넣을 때 안 들어가던 거 수정))
=======
    const voiceChannel = msgMember.voice.channel as VoiceChannel;
    const textChannel = msg.channel as TextChannel;
>>>>>>> cbbf3d6f (music 리펙토링중 3)

    if (!msgMember.voice.channel)
      return textChannel.send('보이스채널에서 해주세요!');
    
    if (msgMember.voice.channel.id != voiceChannel.id)
      return textChannel.send('같은 보이스채널에서 해주세요!');

<<<<<<< HEAD
    if (musicEntity != undefined) {
      if (msgMember.voice.channel.id != musicEntity.voiceChannel.id)
        return msg.channel.send('같은 보이스채널에서 해주세요!');
    }

    if (args.length == 0) return msg.channel.send('검색어를 입력해주세요!');

    const searchStr = args.join(' ');

    const items = await search(searchStr, { source: { youtube: 'video' }, limit: 8 });
<<<<<<< HEAD
    if (items.length == 0) return msg.channel.send('검색결과가 없네요. 다른 키워드로 다시 시도해보세요!');
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
=======

    if (items.length == 0) return msg.channel.send('검색결과가 없네요. 다른 키워드로 다시 시도해보세요!');
=======
    const items = await musicSearch(msg, args, 8);
    if(!items) return; // 검색이 안 된 경우
>>>>>>> cbbf3d6f (music 리펙토링중 3)

    //임베드 만들기
    const fields = items.map((e, i) => {
      return {
        name: '\u200b',
        value: `[${i + 1}. ${e.title}](${e.url})`, //markdown 사용
        url: e.url
      };
<<<<<<< HEAD
    })
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
=======
    });
>>>>>>> c7854135 (노래봇 버그 수정 (노래 끝나고 다시 노래 넣을 때 안 들어가던 거 수정))

    const embedSearchYoutube = {
      title: '노래 검색 목록',
      color: 0xf7cac9,
<<<<<<< HEAD
<<<<<<< HEAD
      description: `**${args.join(' ')}**에 대한 검색 결과에요~`,
      fields: fields
    };

    const embedMsg = await textChannel.send({ embeds: [embedSearchYoutube] });

    const filter = (message: Message) => {
      return !message.author.bot && message.author.id === msg.author.id;
    };
    const collector = textChannel.createMessageCollector({ filter, max: 1 });
    collector.on('collect', async (message) => {
      const msgArr = effectiveArr(message.content, 1, items.length); //배열이 유효한지 조사

      //리스트에 추가할 게 없을 때(즉, 검색이 유효하지 않으면 바로 취소함)
      if (!msgArr.length) message.channel.send('유효하지 않은 대답이에요. 노래 검색 취소할게요..;;');
      else {
        for (const e of msgArr) {
          const tmpStr = embedSearchYoutube.fields[e - 1].url.split(/\s+/);
          await musicExecute.execute(message, tmpStr);
        }
=======
      description: `**${searchStr}**에 대한 검색 결과에요~`,
=======
      description: `**${args.join(' ')}**에 대한 검색 결과에요~`,
>>>>>>> cbbf3d6f (music 리펙토링중 3)
      fields: fields
    };

    const embedMsg = await msg.channel.send({ embeds: [embedSearchYoutube] });

    const filter = (message: Message) => {
      return !message.author.bot && message.author.id === msg.author.id;
    };
    const collector = textChannel.createMessageCollector({ filter, max: 1 });
    collector.on('collect', async (message) => {
      const msgArr = effectiveArr(message.content, 1, items.length); //배열이 유효한지 조사

      //리스트에 추가할 게 없을 때(즉, 검색이 유효하지 않으면 바로 취소함)
      if (!msgArr.length) message.channel.send('유효하지 않은 대답이에요. 노래 검색 취소할게요..;;');
      else {
        msgArr.forEach((e) => {
          const tmpStr = embedSearchYoutube.fields[e - 1].url.split(/\s+/);
          musicExecute.execute(message, tmpStr);
        });
      }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

<<<<<<< HEAD
<<<<<<< HEAD
      while (msgArr.length > 0) {
        const tmpStr = embedSearchYoutube.fields[msgArr.shift()].url.split(/\s+/);
        await require('./musicExecute').execute(message, tmpStr);
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
      }
=======
      msgArr.forEach((e)=>{
        const tmpStr = embedSearchYoutube.fields[e].url.split(/\s+/);
        musicExecute.execute(message, tmpStr);
      })
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
=======
      msgArr.forEach((e) => {
        const tmpStr = embedSearchYoutube.fields[e - 1].url.split(/\s+/);
        musicExecute.execute(message, tmpStr);
      });
>>>>>>> c7854135 (노래봇 버그 수정 (노래 끝나고 다시 노래 넣을 때 안 들어가던 거 수정))

=======
>>>>>>> 982996fa (music 리펙토링중 1)
      message.delete();
      embedMsg.delete();
=======
      message.delete(); embedMsg.delete();
>>>>>>> cbbf3d6f (music 리펙토링중 3)
=======
      message.delete();
      embedMsg.delete();
>>>>>>> a468518a (pretter 적용)
    });
  }
};
