import { ButtonStyle, Message } from "discord.js";
import { getCMDQueue, initCMDQueue, setCMDQueue } from "../collection/cmdQueue";
import { musicCollection } from "../collection/musicCollection";
import { CMD } from "../types/type";

export const musicExecuteMsgCollector = (msg:Message, options:any) => {
  return new Promise(async (resolve, reject)=>{
    const musicEntity = musicCollection.get(msg.guildId);

    const collector = msg.channel.createMessageComponentCollector(options);
    musicEntity.InteractionCollector?.removeAllListeners();
    musicEntity.InteractionCollector?.stop();
    musicEntity.InteractionCollector = collector;

    collector.on('collect', async (i: any) => { try {
      const update = () => { i.update({ content: i.message.content, components: i.message.components }); }

      if (getCMDQueue(msg.guildId)) {
        musicEntity.textChannel.send(`${getCMDQueue(msg.guildId).name} 명령어 입력 대기 중이라 잠시 뒤에 다시 부탁드립니다 ㅎㅎ`);
        update(); resolve(undefined); return;
      }

      //보이스채널 체크
      if (!musicEntity.voiceChannel) {
        musicEntity.textChannel.send('보이스채널에서 해주세요!');
        update(); resolve(undefined); return;
      }

      //같은 보이스채널 체크
      if (i.member.voice.channelId != musicEntity.voiceChannel.id) {
        musicEntity.textChannel.send('같은 보이스채널에서 해주세요!');
        update(); resolve(undefined); return;
      }

      //버튼 시각화를 위함
      const [Success , Secondary] = [ButtonStyle.Success, ButtonStyle.Secondary];
      const setButtonStyle = (bool: boolean) => {
        i.component.data.style = bool ? Success : Secondary;
      }

      //명령어큐를 일단
      const ICMD:CMD={
        name: "노래버튼", cmd: [], type: "", permission: [],
        execute: async (): Promise<any> => {}
      };
      setCMDQueue(msg.guildId, ICMD);
      switch (i.customId) {
        //Button First
        case '⏩': musicEntity.skip(); break;
        case '⏹': musicEntity.empty(); break;
        case '🔀': await musicEntity.shuffle(); break;
        case '🔉': await musicEntity.setVolume(musicEntity.option.volume-0.1); break;
        case '🔊': await musicEntity.setVolume(musicEntity.option.volume+0.1); break;

        //Button Second
        case '⏯': await musicEntity.pause(); setButtonStyle(musicEntity.audioPlayer.state.status == 'playing'); break;
        case '🔁': await musicEntity.loop(); setButtonStyle(musicEntity.option.loop); break;
        case '🔇': await musicEntity.mute(); setButtonStyle(musicEntity.option.mute); break;
      }

      update(); resolve(undefined);
    } catch(e) {
      reject(e);
    } finally{
      initCMDQueue(msg.guildId);
    }});
  });
}