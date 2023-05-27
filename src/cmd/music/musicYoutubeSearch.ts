import { CMD } from '../../types/type';
import { Message, TextChannel, PermissionsBitField, EmbedBuilder } from 'discord.js';
import { musicSearch } from '../../func/music/musicSearch';
import { musicYoutubeSearchCollector } from '../../collector/musicYoutubeSearchCollector';
import { musicCollection } from '../../collection/musicCollection';

export const musicYoutubeSearch: CMD = {
  name: '검색',
  cmd: ['검색', '노래검색', 'ㄴㄹㄱㅅ', 'ㄴㄺㅅ'],
  type: 'music',
  permission: [
    PermissionsBitField.Flags.Connect,
    PermissionsBitField.Flags.Speak,
    PermissionsBitField.Flags.ManageEmojisAndStickers,
    PermissionsBitField.Flags.ReadMessageHistory,
    PermissionsBitField.Flags.ManageMessages
  ],
  //찾은 유튜브 주소를 배열에 집어넣는 함수
  async execute(msg, args) {
    const textChannel = msg.channel as TextChannel;
    const voiceChannel = msg.member.voice.channel;
    const items = await musicSearch(args?.join(' '), 8);

    //검색어 체크부분
    if (!args?.length) {
      await textChannel.send('검색어를 입력해주세요!');
      return;
    }

    //보이스채널 체크부분
    if (!voiceChannel) {
      await textChannel.send('보이스채널에서 해주세요!');
      return;
    }

    //같은 보이스채널 체크 부분
    if (musicCollection.get(msg.guildId) && voiceChannel.id != musicCollection.get(msg.guildId).voiceChannel.id){
      await textChannel.send('같은 보이스채널에서 해주세요!');
      return;
    }

    // 검색이 안 된 경우
    if (!items) {
      await textChannel.send('어떤 곡을 찾아야 할지 모르겠어요!'); 
      return;
    }
    
    return new Promise(async (resolve, reject)=>{ try {
      //임베드 만들기
      const embedSearchYoutube = new EmbedBuilder({
        title: '노래 검색 목록',
        color: 0xf7cac9,
        description: `**${args.join(' ')}**에 대한 검색 결과에요~`,
        fields:
          items.map((e, i) => {
            return {
              name: `${i + 1}. ${e.title}\u200b`,
              value: `[link](${e.url})`,
              inline: false
            };
          }),
      });

      //검색결과 보여주기
      const embedMsg = await textChannel.send({ embeds: [embedSearchYoutube] });
      const filter = (i: Message) => !i.author.bot && i.author.id === msg.author.id;
      await musicYoutubeSearchCollector(embedMsg, items, { filter, max: 1, time: 60000, errors: ['time'] })
      .catch((e) => reject(e));
      resolve(undefined); return;
    } catch(e) {reject(e)} });
  }
};
