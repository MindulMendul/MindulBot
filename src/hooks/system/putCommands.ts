import { Collection } from 'discord.js';
import { CMD } from '../../types/type';

import { adminHeapSnapshot } from '../../cmd/admin/heapSnapshot';
import { test } from '../../cmd/admin/test';

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
  const CmdtoName = (cmdComponent: CMD) => {
    const cmdList = cmdComponent.cmd;
    const name = cmdComponent.name;
    cmdList.forEach((e: string) => map.set(e, name));
  };

  const putCmd = (cmdComponent: CMD) => {
    CmdtoName(cmdComponent);
    commands.set(cmdComponent.name, cmdComponent);
  };

  //admin
  putCmd(adminHeapSnapshot);
  putCmd(test);

  //basic
  putCmd(basicAngry);
  putCmd(basicDate);
  putCmd(basicDev);
  putCmd(basicDice);
  putCmd(basicGongji);
  putCmd(basicHelp);
  putCmd(basicMendul);
  putCmd(basicMindul);
  putCmd(basicMindulMendul);
  putCmd(basicNaga);
  putCmd(basicSuggestion);
  putCmd(basicTarot);
  putCmd(basicTime);

  //music
  putCmd(musicEmpty);
  putCmd(musicExecute);
  putCmd(musicHelp);
  putCmd(musicRemove);
  putCmd(musicShow);
  putCmd(musicShuffle);
  putCmd(musicSkip);
  putCmd(musicYoutubeSearch);
};
