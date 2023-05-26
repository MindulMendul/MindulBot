import { Message, TextChannel } from "discord.js";
import { musicExecute } from "../cmd/music/musicExecute";
import { musicCollection } from "../collection/musicCollection";
import { effectiveArr } from "../func/system/effectiveArr";

//이부분은 콜렉터 형식으로 따로 구현해두기
export const musicYoutubeSearchCollector=(msg:Message, items:Array<any>, options:any)=>{
  return new Promise(async (resolve, reject)=>{
    const musicEntity = musicCollection.get(msg.guildId);
    const textChannel = msg.channel as TextChannel;

    const collector = textChannel.createMessageCollector(options);
    collector.on('collect', async (i: Message) => {
      const msgArr = effectiveArr(i.content, 1, items.length); //배열이 유효한지 조사
      //리스트에 추가할 게 없을 때(즉, 검색이 유효하지 않으면 바로 취소함)
      if (!msgArr) {
        await msg.delete();
        textChannel.send('유효하지 않은 대답이에요. 노래 검색 취소할게요..;;');
        resolve(undefined);
      }

      msgArr.forEach(async (e)=>{
        await musicExecute.execute(msg, msg.embeds[0].fields[e - 1]["url"].split(/\s+/));
      });

      await msg.delete();
      resolve(undefined);
    });
  });
}
