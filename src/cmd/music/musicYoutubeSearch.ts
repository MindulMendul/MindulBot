import { search } from 'play-dl';
import { effectiveArr } from './../../hooks/system/effectiveArr';
import { CMD } from '../../types/type';
import { GuildMember, Message, TextChannel, VoiceChannel } from 'discord.js';
import { musicExecute } from './musicExecute';
import { musicSearch } from '../../hooks/music/musicSearch';

export const musicYoutubeSearch: CMD = {
  name: '검색',
  cmd: ['검색', '노래검색', 'ㄴㄹㄱㅅ', 'ㄴㄺㅅ'],
  type: 'music',
  permission: ['CONNECT', 'SPEAK', 'MANAGE_EMOJIS_AND_STICKERS', 'READ_MESSAGE_HISTORY', 'MANAGE_MESSAGES'],
  //찾은 유튜브 주소를 배열에 집어넣는 함수
  async execute(msg, args) {
    const msgMember = msg.member as GuildMember;
    const voiceChannel = msgMember.voice.channel as VoiceChannel;
    const textChannel = msg.channel as TextChannel;

    //보이스채널 체크부분
    if (!msgMember.voice.channel) return textChannel.send('보이스채널에서 해주세요!');

    //검색어 체크부분
    if(!args?.length) return textChannel.send("검색어를 입력해주세요!");

    //같은 보이스채널인지 체크
    if (msgMember.voice.channel.id != voiceChannel.id) return textChannel.send('같은 보이스채널에서 해주세요!');

    const items = await musicSearch(args?.join(" "), 8);
    if (!items) return textChannel.send('어떤 곡을 찾아야 할지 모르겠어요!'); // 검색이 안 된 경우

    //임베드 만들기
    const fields = items.map((e, i) => {
      return {
        name: '\u200b',
        value: `[${i + 1}. ${e.title}](${e.url})`, //markdown 사용
        url: e.url
      };
    });

    const embedSearchYoutube = {
      title: '노래 검색 목록',
      color: 0xf7cac9,
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
        msgArr.forEach((e) => {
          const tmpStr = embedSearchYoutube.fields[e - 1].url.split(/\s+/);
          musicExecute.execute(message, tmpStr);
        });
      }
      message.delete();
      embedMsg.delete();
    });
  }
};
