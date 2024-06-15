import { musicShow } from '../cmd/music/musicQueue.js';
import { musicCollection } from '../collection/musicCollection.js';

export const musicRemoveCollector = async (msg, args, options) => {
  return new Promise(async (resolve, reject) => {
    const musicEntity = musicCollection.get(msg.guildId);
    const correctArr = ['네', '어', 'ㅇㅋ', 'ㅇㅇ', 'ㅇ', 'd', 'D', 'y', 'Y', '알았어', 'dz', 'dd', '얍', '0'];
    const { textChannel } = musicEntity;

    const collector = textChannel.createMessageCollector(options);
    collector.once('collect', async (i) => {
      try {
        //부정 표현을 쓴 경우
        if (!correctArr.includes(i.content)) {
          textChannel.send('부정의 의미로 받아들이고, 그대로 내버려둘게요.');
          resolve(undefined);
          return;
        }

        args
          .sort((a, b) => Number(b) - Number(a))
          .forEach((element) => {
            musicEntity.songQueue.splice(Number(element) - 1, 1);
          });
        //큐에 남아있는 노래가 있다면 보여주기
        msg.delete();
        await musicShow.execute(await textChannel.send('삭제 완료!'));
        resolve(undefined);
      } catch (error) {
        reject(error);
        return;
      }
    });

    collector.on('end', (collected) => {
      try {
        if (!collected.first()) textChannel.send('삭제 명령어가 취소되었습니다. 다시 시도해주세요~');
        resolve(undefined);
      } catch (error) {
        reject(error);
        console.error(error);
        return;
      }
    });
  });
};
