<<<<<<< HEAD
<<<<<<< HEAD
import { Message } from 'discord.js';
import { musicCollection } from '../../../bot';
import { musicShow } from '../../cmd/music/musicShow';
import { musicEntity } from '../../types/musicType';

export const musicRemoveReact = async (guildId: string, memberId: string, args: Array<number>) => {
  const musicEntity = musicCollection.get(guildId) as musicEntity;
  const correctArr = ['네', '어', 'ㅇㅋ', 'ㅇㅇ', 'ㅇ', 'd', 'D', 'y', 'Y', '알았어', 'dz', 'dd', '얍', '0'];
  const { textChannel } = musicEntity;

  //콜렉터 부분
  const filter = (message: Message) => { return !message.author.bot && message.author.id === memberId; };
  const collector = textChannel.createMessageCollector({ filter, max: 1, time: 7000 });
  collector.on('collect', async (msg: Message) => {
    if (correctArr.includes(msg.content)) {
      //긍정
      args.sort((a: number, b: number) => { return b - a; })
        .forEach((element: number) => { musicEntity.songQueue.splice(element-1, 1); });
      musicShow.execute(await textChannel.send('삭제 완료!'), []); //큐에 남아있는 노래가 있다면 보여주기
    } //부정
    else textChannel.send('부정의 의미로 받아들이고, 그대로 내버려둘게요.');
  });

  collector.on('end', (collected) => {
    if (!collected.first()) textChannel.send('대답이 따로 없으니까 그냥 내비둘게요~');
  });
};
=======
export const musicRemoveReact = async(msg: any, args: any, connection: any) => {
=======
import { Message } from "discord.js";

export const musicRemoveReact = async(msg: Message, args: any, connection: any) => {
>>>>>>> af63370e (노래봇 작동은 하는데 왜 되는지는 모름)
    const correctArr = ['네', '어', 'ㅇㅋ', 'ㅇㅇ', 'ㅇ', 'd', 'D', 'y', 'Y', '알았어', 'dz', 'dd', '얍', '0'];

    //콜렉터 부분
    const filter = (message: Message) => {
      return !message.author.bot && message.author.id === msg.author.id;
    };
    const collector = msg.channel.createMessageCollector({ filter, max: 1, time: 7000 });
    collector.on('collect', async (msg: Message) => {
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
  }
>>>>>>> 92fc5a7c (music 부분 고치는 중)
