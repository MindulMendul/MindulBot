import { search } from 'play-dl';
import { effectiveArr } from './../../hooks/system/effectiveArr';
import { CMD } from '../../types/type';
import { GuildMember, Message } from 'discord.js';
import { musicCollection } from '../../../bot';
import { musicExecute } from './musicExecute';

export const musicYoutubeSearch: CMD = {
  name: '검색',
  cmd: ['검색', '노래검색', 'ㄴㄹㄱㅅ', 'ㄴㄺㅅ'],
  type: 'music',
  permission: ['CONNECT', 'SPEAK', 'MANAGE_EMOJIS_AND_STICKERS', 'READ_MESSAGE_HISTORY', 'MANAGE_MESSAGES'],
  //찾은 유튜브 주소를 배열에 집어넣는 함수
  async execute(msg, args) {
    const guildId = msg.guildId as string;
    const musicEntity = musicCollection.get(guildId);
    const msgMember = msg.member as GuildMember;

    if (!msgMember.voice.channel) return msg.channel.send('보이스채널에서 해주세요!');

    if (musicEntity != undefined) {
      if (msgMember.voice.channel.id != musicEntity.voiceChannel.id)
        return msg.channel.send('같은 보이스채널에서 해주세요!');
    }

    if (args.length == 0) return msg.channel.send('검색어를 입력해주세요!');

    const searchStr = args.join(' ');

    const items = await search(searchStr, { source: { youtube: 'video' }, limit: 8 });

    if (items.length == 0) return msg.channel.send('검색결과가 없네요. 다른 키워드로 다시 시도해보세요!');

    //임베드 만들기
    const fields = items.map((e, i) => {
      return {
        name: '\u200b',
        value: `[${i + 1}. ${e.title}](https://www.youtube.com/watch?v=${e.url})`, //markdown 사용
        url: e.url
      };
    });

    const embedSearchYoutube = {
      title: '노래 검색 목록',
      color: 0xf7cac9,
      description: `**${searchStr}**에 대한 검색 결과에요~`,
      fields: fields
    };

    const embedMsg = await msg.channel.send({ embeds: [embedSearchYoutube] });

    const filter = (message: Message) => {
      return !message.author.bot && message.author.id === msg.author.id;
    };
    const collector = msg.channel.createMessageCollector({ filter, max: 1 });
    collector.on('collect', async (message) => {
      const msgArr = await effectiveArr(message.content, ',', 1, 8); //배열이 유효한지 조사

      if (msgArr.length == 0) {
        //리스트에 추가할 게 없을 때(즉, 검색이 유효하지 않으면 바로 취소함)
        message.delete();
        embedMsg.delete();
        message.channel.send('유효하지 않은 대답이에요. 노래 검색 취소할게요..;;');
      }

      msgArr.forEach((e) => {
        const tmpStr = embedSearchYoutube.fields[e - 1].url.split(/\s+/);
        musicExecute.execute(message, tmpStr);
      });

      message.delete();
      embedMsg.delete();
    });
  }
};
