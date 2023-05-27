import { ButtonStyle, Message } from "discord.js";
import { getCMDQueue } from "../collection/cmdQueue";
import { musicCollection } from "../collection/musicCollection";

export const musicExecuteMsgCollector = (msg:Message, options:any) => {
  return new Promise(async (resolve, reject)=>{
    const musicEntity = musicCollection.get(msg.guildId);

    const collector = msg.channel.createMessageComponentCollector(options);
    musicEntity.InteractionCollector?.removeAllListeners();
    musicEntity.InteractionCollector?.stop();
    musicEntity.InteractionCollector = collector;

    collector.on('collect', async (i: any) => { try {
      const iMessage = i.message;
      const iMember = i.member;
      const iGuildId = i.guildId;
      const iComponent = i.component;
      const CMDQueue = getCMDQueue(iGuildId);

      const update = () => { i.update({ content: iMessage.content, components: iMessage.components }); }

      if (CMDQueue) {
        musicEntity.textChannel.send(`${CMDQueue.name} 명령어 입력 대기 중이라 잠시 뒤에 다시 부탁드립니다 ㅎㅎ`);
        update(); resolve(undefined); return;
      }

      //보이스채널 체크
      if (!musicEntity.voiceChannel) {
        musicEntity.textChannel.send('보이스채널에서 해주세요!');
        update(); resolve(undefined); return;
      }

      //같은 보이스채널 체크
      if (iMember.voice.channelId != musicEntity.voiceChannel.id) {
        musicEntity.textChannel.send('같은 보이스채널에서 해주세요!');
        update(); resolve(undefined); return;
      }

      //버튼 시각화를 위함
      const [Success , Secondary] = [ButtonStyle.Success, ButtonStyle.Secondary];
      const setButtonStyle = (bool: boolean) => {
        iComponent.data.style = bool ? Success : Secondary;
      }

      switch (i.customId) {
        //Button First
        case '⏩': musicEntity.skip(); break;
        case '⏹': musicEntity.empty(); break;
        case '🔀': musicEntity.shuffle(); break;
        case '🔉': musicEntity.setVolume(musicEntity.option.volume-0.1); break;
        case '🔊': musicEntity.setVolume(musicEntity.option.volume+0.1); break;

        //Button Second
        case '⏯': musicEntity.pause(); setButtonStyle(musicEntity.audioPlayer.state.status == 'playing'); break;
        case '🔁': musicEntity.loop(); setButtonStyle(musicEntity.option.loop); break;
        case '🔇': musicEntity.mute(); setButtonStyle(musicEntity.option.mute); break;
      }

      update(); resolve(undefined); return;
    } catch(e) {reject(e); return;}});
  });
}