import { MessageComponentInteraction, Message, MessageButton, MessageActionRowComponent } from "discord.js";

export const musicVisualizeOnOff = (emoji: string, i: MessageComponentInteraction, index: number) => {
    const iMessage = i.message as Message;
    const iComponent = i.component as MessageButton;
    const buttonSecond = iMessage.components[1];
  
    const stylePause = (
      iMessage.components[1].components
        .filter((elem: MessageActionRowComponent) => {
          return (elem as MessageButton).label == emoji;
        })
        .pop() as MessageButton
    ).style;
  
    if (stylePause == 'SUCCESS') iComponent.setStyle('SECONDARY'); //on일 때 off으로 시각화
    else if (stylePause == 'SECONDARY') iComponent.setStyle('SUCCESS'); //off일 때 on으로 시각화
  
    buttonSecond.components.splice(index, 1, iComponent);
    buttonSecond.setComponents(buttonSecond.components);
  };