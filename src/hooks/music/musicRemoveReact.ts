import { Message } from 'discord.js';

export const musicRemoveReact = async (msg: Message, args: any, connection: any) => {
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
};
