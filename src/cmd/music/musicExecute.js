import { PermissionsBitField } from 'discord.js';
import { musicSearch } from '../../func/music/musicSearch.js';
import { musicCollection } from '../../collection/musicCollection.js';
import { MusicEntity } from '../../configs/musicEntity.js';

export const musicExecute = {
  name: '노래',
  cmd: ['노래', '시작', '선곡'],
  type: 'music',
  permission: [
    PermissionsBitField.Flags.SendMessages,
    PermissionsBitField.Flags.Connect,
    PermissionsBitField.Flags.Speak,
    PermissionsBitField.Flags.EmbedLinks,
    PermissionsBitField.Flags.ReadMessageHistory
  ],
  async execute(msg, args) {
    //써야할 변수 모음
    const guildId = msg.guildId;
    const textChannel = msg.channel;
    const voiceChannel = msg.member.voice.channel;

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

    //같은 보이스채널인지 체크
    if (musicCollection.get(guildId) && voiceChannel.id != musicCollection.get(guildId).voiceChannel.id) {
      await textChannel.send('같은 보이스채널에서 해주세요!');
      return;
    }

    //노래 검색부분
    const searchedMetadata = (await musicSearch(args?.join(' '), 1))?.pop();
    if (!searchedMetadata) {
      await textChannel.send('검색결과가 없어요 ㅠㅠ 다른 키워드로 다시 시도해보세요!'); // 검색이 안 된 경우
      return;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const musicEntity = musicCollection.get(guildId) || new MusicEntity(); // 없을 수도 있음
        musicCollection.set(guildId, musicEntity);
        musicEntity.init(voiceChannel, textChannel);
        await musicEntity.pushSongQueue(searchedMetadata);
        if (!musicEntity.connection)
          await musicEntity.connect().catch((error) => {
            reject(error);
          });
        else await textChannel.send(`${searchedMetadata.title}가 큐에 들어왔어요~`);
        resolve(undefined);
        return;
      } catch (error) {
        reject(error);
      }
    });
  }
};
