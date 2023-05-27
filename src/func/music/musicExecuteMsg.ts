import { ButtonBuilder, MessageComponentInteraction, ActionRowBuilder, ButtonStyle, MessageCreateOptions } from 'discord.js';
import { musicCollection } from '../../collection/musicCollection';
import { musicExecuteMsgCollector } from '../../collector/musicExecuteMsgCollector';

export const musicExecuteMsg = async (guildId: string) => {
  const musicEntity = musicCollection.get(guildId);
  const { textChannel, option, playingSong } = musicEntity;

  //첫 번째 줄 버튼
  const [Primary, Success, Secondary] = [ButtonStyle.Primary, ButtonStyle.Success, ButtonStyle.Secondary];
  const buttonFirst = new ActionRowBuilder()
    .addComponents(new ButtonBuilder().setCustomId('⏩').setLabel('⏩').setStyle(Primary))
    .addComponents(new ButtonBuilder().setCustomId('⏹').setLabel('⏹').setStyle(Primary))
    .addComponents(new ButtonBuilder().setCustomId('🔀').setLabel('🔀').setStyle(Primary))
    .addComponents(new ButtonBuilder().setCustomId('🔉').setLabel('🔉').setStyle(Primary))
    .addComponents(new ButtonBuilder().setCustomId('🔊').setLabel('🔊').setStyle(Primary));
  //두 번째 줄 버튼(이건 ON OFF 시각화를 위해 추가적인 작업이 필요함)
  const buttonSecond = new ActionRowBuilder()
    .addComponents(new ButtonBuilder().setCustomId('⏯').setLabel('⏯').setStyle(Success)) //pause on 상황일 때는 다음으로 넘어가지 않음
    .addComponents(new ButtonBuilder().setCustomId('🔁').setLabel('🔁').setStyle(option.loop ? Success : Secondary))
    .addComponents(new ButtonBuilder().setCustomId('🔇').setLabel('🔇').setStyle(option.mute ? Success : Secondary));

  //Embed 생성하는 코드
  //첫 번째 줄 버튼
  const song = playingSong.metadata;
  const sendedContent = {
    content: `이번 선곡은~\n> **${song.title}**\n> ${song.url}`,
    components: [buttonFirst, buttonSecond]
  } as MessageCreateOptions;
  const msgSungok = await textChannel.send(sendedContent);

  //버튼 인터렉션 콜렉터 부분
  const filter = (i: MessageComponentInteraction) => i.message.id === msgSungok.id;
  musicExecuteMsgCollector(msgSungok, {filter});
};