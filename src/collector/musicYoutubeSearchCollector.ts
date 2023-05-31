import { Message, TextChannel } from 'discord.js';
import { YouTubeVideo } from 'play-dl';
import { musicCollection } from '../collection/musicCollection';
import { MusicEntity } from '../configs/musicEntity';
import { effectiveArr } from '../func/system/effectiveArr';
import { metadata } from '../types/type';

//이부분은 콜렉터 형식으로 따로 구현해두기
export const musicYoutubeSearchCollector = (msg: Message, items: Array<YouTubeVideo>, options: any) => {
  return new Promise(async (resolve, reject) => {
    const guildId = msg.guildId;
    const textChannel = msg.channel as TextChannel;

    const collector = textChannel.createMessageCollector(options);
    collector.on('collect', async (i: Message) => {
      try {
        const msgArr = effectiveArr(i.content, 1, items.length); //배열이 유효한지 조사
        //리스트에 추가할 게 없을 때(즉, 검색이 유효하지 않으면 바로 취소함)
        if (!msgArr) {
          await msg.delete();
          textChannel.send('유효하지 않은 대답이에요. 노래 검색 취소할게요..;;');
          resolve(undefined);
          return;
        }

        const musicEntity = musicCollection.get(guildId) ? musicCollection.get(guildId) : new MusicEntity(); // 없을 수도 있음
        musicCollection.set(guildId, musicEntity);
        musicEntity.init(i.member.voice.channel, textChannel);

        for(const e of msgArr){
          await musicEntity.pushSongQueue(items[e - 1] as metadata);
          if (!musicEntity.connection) await musicEntity.connect();
          else textChannel.send(`${items[e - 1].title}가 큐에 들어왔어요~`);
        };

        await msg.delete();
        resolve(undefined);
      } catch (error) {
        reject(error);
        console.error(error);
        return;
      }
    });
  });
};
