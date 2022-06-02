import { Collection } from 'discord.js';
import { CMD } from '../../types/type';

import { basicAngry } from '../../cmd/basic/basicAngry';
import { basicDate } from '../../cmd/basic/basicDate';
import { basicDev } from '../../cmd/basic/basicDev';
import { basicDice } from '../../cmd/basic/basicDice';
import { basicGongji } from '../../cmd/basic/basicGongji';
import { basicHelp } from '../../cmd/basic/basicHelp';
import { basicMendul } from '../../cmd/basic/basicMendul';
import { basicMindul } from '../../cmd/basic/basicMindul';
import { basicMindulMendul } from '../../cmd/basic/basicMindulMendul';
import { basicNaga } from '../../cmd/basic/basicNaga';
import { basicSuggestion } from '../../cmd/basic/basicSuggestion';
import { basicTarot } from '../../cmd/basic/basicTarot';
import { basicTime } from '../../cmd/basic/basicTime';

import { musicEmpty } from '../../cmd/music/musicEmpty';
import { musicExecute } from '../../cmd/music/musicExecute';
import { musicHelp } from '../../cmd/music/musicHelp';
import { musicRemove } from '../../cmd/music/musicRemove';
import { musicShow } from '../../cmd/music/musicShow';
import { musicShuffle } from '../../cmd/music/musicShuffle';
import { musicSkip } from '../../cmd/music/musicSkip';
import { musicYoutubeSearch } from '../../cmd/music/musicYoutubeSearch';

export const putCommands = (map: Collection<string, string>, commands: Collection<string, CMD>) => {
  const CmdtoName = (map: Collection<string, string>, cmdComponent: CMD) => {
    const cmdList = cmdComponent.cmd;
    const name = cmdComponent.name;
    cmdList.forEach((e: string) => map.set(e, name));
  };

  const putCmd = (map: Collection<string, string>, commands: Collection<string, CMD>, cmdComponent: CMD) => {
    CmdtoName(map, cmdComponent);
    commands.set(cmdComponent.name, cmdComponent);
  };

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
  putCmd(map, commands, musicRemove);
  putCmd(map, commands, musicShow);
  putCmd(map, commands, musicShuffle);
  putCmd(map, commands, musicSkip);
  putCmd(map, commands, musicYoutubeSearch);
};
