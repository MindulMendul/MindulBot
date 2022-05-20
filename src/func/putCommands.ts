import { Collection, Message } from "discord.js";
import { cmd } from "../type";

import { basicAngry } from "../Commands/basic/basicAngry";
import { basicDate } from "../Commands/basic/basicDate";
import { basicDev } from "../Commands/basic/basicDev";
import { basicDice } from "../Commands/basic/basicDice";
import { basicGongji } from "../Commands/basic/basicGongji";
import { basicHelp } from "../Commands/basic/basicHelp";
import { basicMendul } from "../Commands/basic/basicMendul";
import { basicMindul } from "../Commands/basic/basicMindul";
import { basicMindulMendul } from "../Commands/basic/basicMindulMendul";
import { basicNaga } from "../Commands/basic/basicNaga";
import { basicSuggestion } from "../Commands/basic/basicSuggestion";
import { basicTarot } from "../Commands/basic/basicTarot";
import { basicTime } from "../Commands/basic/basicTime";

import { musicEmpty } from "../Commands/music/musicEmpty";
import { musicExecute } from "../Commands/music/musicExecute";
import { musicHelp } from "../Commands/music/musicHelp";
import { musicLoop } from "../Commands/music/musicLoop";
import { musicRemove } from "../Commands/music/musicRemove";
import { musicShow } from "../Commands/music/musicShow";
import { musicShuffle } from "../Commands/music/musicShuffle";
import { musicSkip } from "../Commands/music/musicSkip";
import { musicYoutubeSearch } from "../Commands/music/musicYoutubeSearch";

export const putCommands = async (map: Collection<string, string>,
                                  commands: Collection<string, (arg0: Message, arg1?: Array<string>) => Promise<void | string | Message>>) => {
    const CmdtoName = async (map: Collection<string, string>, cmdComponent: cmd) => {
        const cmdList = cmdComponent.cmd;
        const name = cmdComponent.name;
        cmdList.forEach((e: string)=>map.set(e, name));
    }
    
    const putCmd = async (map: Collection<string, string>,
                          commands: Collection<string, (arg0: Message, arg1?: Array<string>) => Promise<void | string | Message>>,
                          cmdComponent: cmd) => {
        await CmdtoName(map, cmdComponent);
        commands.set(cmdComponent.name, cmdComponent.execute);
    }

    //basic
    putCmd(map, commands, basicAngry);
    putCmd(map, commands, basicDate);
    putCmd(map, commands, basicDev);
    putCmd(map, commands, basicDice);
    putCmd(map, commands, basicGongji);
    putCmd(map, commands, basicHelp);
    putCmd(map, commands, basicMendul);
    putCmd(map, commands, basicMindul);
    putCmd(map, commands, basicMindulMendul);
    putCmd(map, commands, basicNaga);
    putCmd(map, commands, basicSuggestion);
    putCmd(map, commands, basicTarot);
    putCmd(map, commands, basicTime);

    //music
    putCmd(map, commands, musicEmpty);
    putCmd(map, commands, musicExecute);
    putCmd(map, commands, musicHelp);
    putCmd(map, commands, musicLoop);
    putCmd(map, commands, musicRemove);
    putCmd(map, commands, musicShow);
    putCmd(map, commands, musicShuffle);
    putCmd(map, commands, musicSkip);
    putCmd(map, commands, musicYoutubeSearch);
}