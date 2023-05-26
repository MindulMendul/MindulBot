import { ButtonStyle, Message } from "discord.js";
import { getCMDQueue } from "../collection/cmdQueue";
import { musicCollection } from "../collection/musicCollection";

export const musicExecuteMsgCollector = (msg:Message, options:any) => {
  const musicEntity = musicCollection.get(msg.guildId);
  const collector = msg.channel.createMessageComponentCollector(options);
  musicEntity.reactCollector = collector;

  collector.on('collect', async (i: any) => {
    const iMessage = i.message;
    const iMember = i.member;
    const iGuildId = i.guildId;
    const iComponent = i.component;
    const checkGuildCmdQueue = getCMDQueue(iGuildId);

    const update = () => { i.update({ content: iMessage.content, components: iMessage.components }); }

    if (checkGuildCmdQueue) {
      musicEntity.textChannel.send(`${checkGuildCmdQueue.name} 명령어 입력 대기 중이라 잠시 뒤에 다시 부탁드립니다 ㅎㅎ`);
      update(); return;
    }

    //보이스채널 체크
    if (!musicEntity.voiceChannel) {
      musicEntity.textChannel.send('보이스채널에서 해주세요!');
      update(); return;
    }

    //같은 보이스채널 체크
    if (iMember.voice.channelId != musicEntity.voiceChannel.id) {
      musicEntity.textChannel.send('같은 보이스채널에서 해주세요!');
      update(); return;
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
      case '🔀': musicEntity.shuffle(iMessage); break;
      case '🔉': musicEntity.setVolume(iMessage, musicEntity.option.volume-0.1); break;
      case '🔊': musicEntity.setVolume(iMessage, musicEntity.option.volume+0.1); break;

      //Button Second
      case '⏯': musicEntity.pause(iMessage); setButtonStyle(musicEntity.audioPlayer.state.status == 'playing'); break;
      case '🔁': musicEntity.loop(iMessage); setButtonStyle(musicEntity.option.loop); break;
      case '🔇': musicEntity.mute(iMessage); setButtonStyle(musicEntity.option.mute); break;
    }

    update();
  });
}