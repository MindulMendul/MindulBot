import { Collection } from 'discord.js';
import { CMD } from '../../types/type';

<<<<<<< HEAD
<<<<<<< HEAD
//import { adminHeapSnapshot } from '../../cmd/admin/heapSnapshot';
//import { test } from '../../cmd/admin/test';

=======
=======
import { test } from '../../cmd/test';

>>>>>>> 254ee395 (노래봇 진짜 제대로 고친 것 같은데...?? (희망사항))
import { basicAngry } from '../../cmd/basic/basicAngry';
import { basicDate } from '../../cmd/basic/basicDate';
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
import { basicDev } from '../../cmd/basic/basicDev';
import { basicDice } from '../../cmd/basic/basicDice';
import { basicGongji } from '../../cmd/basic/basicGongji';
import { basicHelp } from '../../cmd/basic/basicHelp';
<<<<<<< HEAD
import { basicMindul } from '../../cmd/basic/basicMindul';
import { basicSuggestion } from '../../cmd/basic/basicSuggestion';
import { basicTarot } from '../../cmd/basic/basicTarot';
=======
import { basicMendul } from '../../cmd/basic/basicMendul';
import { basicMindul } from '../../cmd/basic/basicMindul';
import { basicMindulMendul } from '../../cmd/basic/basicMindulMendul';
import { basicNaga } from '../../cmd/basic/basicNaga';
import { basicSuggestion } from '../../cmd/basic/basicSuggestion';
import { basicTarot } from '../../cmd/basic/basicTarot';
import { basicTime } from '../../cmd/basic/basicTime';
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))

import { musicEmpty } from '../../cmd/music/musicEmpty';
import { musicExecute } from '../../cmd/music/musicExecute';
import { musicHelp } from '../../cmd/music/musicHelp';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { musicLoop } from '../../cmd/music/musicLoop';
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
=======
>>>>>>> c7854135 (노래봇 버그 수정 (노래 끝나고 다시 노래 넣을 때 안 들어가던 거 수정))
import { musicRemove } from '../../cmd/music/musicRemove';
import { musicShow } from '../../cmd/music/musicShow';
import { musicShuffle } from '../../cmd/music/musicShuffle';
import { musicSkip } from '../../cmd/music/musicSkip';
import { musicYoutubeSearch } from '../../cmd/music/musicYoutubeSearch';

export const putCommands = (map: Collection<string, string>, commands: Collection<string, CMD>) => {
<<<<<<< HEAD
  const CmdtoName = (cmdComponent: CMD) => {
=======
  const CmdtoName = (map: Collection<string, string>, cmdComponent: CMD) => {
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
    const cmdList = cmdComponent.cmd;
    const name = cmdComponent.name;
    cmdList.forEach((e: string) => map.set(e, name));
  };

<<<<<<< HEAD
  const putCmd = (cmdComponent: CMD) => {
    CmdtoName(cmdComponent);
    commands.set(cmdComponent.name, cmdComponent);
  };

  //admin
  // putCmd(adminHeapSnapshot);
  // putCmd(test);

  //basic
  putCmd(basicDev);
  putCmd(basicDice);
  putCmd(basicGongji);
  putCmd(basicHelp);
  putCmd(basicMindul);
  putCmd(basicSuggestion);
  putCmd(basicTarot);

  //music
  putCmd(musicEmpty);
  putCmd(musicExecute);
  putCmd(musicHelp);
  putCmd(musicRemove);
  putCmd(musicShow);
  putCmd(musicShuffle);
  putCmd(musicSkip);
  putCmd(musicYoutubeSearch);
=======
  const putCmd = (map: Collection<string, string>, commands: Collection<string, CMD>, cmdComponent: CMD) => {
    CmdtoName(map, cmdComponent);
    commands.set(cmdComponent.name, cmdComponent);
  };

  //test
  putCmd(map, commands, test);

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
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
};
