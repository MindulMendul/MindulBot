import { Message, MessageCollectorOptions } from 'discord.js';
import { musicShow } from '../cmd/music/musicQueue';
import { musicCollection } from '../collection/musicCollection';

export const musicRemoveCollector = async (msg: Message, args:Array<string>, options: MessageCollectorOptions) => {
  return new Promise(async (resolve, reject)=>{
    const musicEntity = musicCollection.get(msg.guildId);
    const correctArr = ['네', '어', 'ㅇㅋ', 'ㅇㅇ', 'ㅇ', 'd', 'D', 'y', 'Y', '알았어', 'dz', 'dd', '얍', '0'];
    const { textChannel } = musicEntity;

    const collector = textChannel.createMessageCollector(options);
    collector.on('collect', async (i: Message) => {
      if (correctArr.includes(i.content)) {
        //긍정
        args
          .sort((a, b) => Number(b)-Number(a))
          .forEach((element) => {
            musicEntity.songQueue.splice(Number(element) - 1, 1);
          });
        //큐에 남아있는 노래가 있다면 보여주기
        await musicShow.execute(await textChannel.send('삭제 완료!'));
        resolve(undefined);
      } //부정
      
      textChannel.send('부정의 의미로 받아들이고, 그대로 내버려둘게요.');
    });

    collector.on('end', (collected) => {
      if (!collected.first()) textChannel.send('대답이 따로 없으니까 그냥 내비둘게요~');
    });
  });
}