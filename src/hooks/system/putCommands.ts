import { Collection } from 'discord.js';
import { CMD } from '../../types/type';

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 690cd184 (bot 돌아가게는 할 수 있게 수정)
//import { adminHeapSnapshot } from '../../cmd/admin/heapSnapshot';
//import { test } from '../../cmd/admin/test';

<<<<<<< HEAD
=======
=======
import { test } from '../../cmd/test';
=======
import { adminHeapSnapshot } from '../../cmd/admin/heapSnapshot'
=======
import { adminHeapSnapshot } from '../../cmd/admin/heapSnapshot';
>>>>>>> d8b8e534 (ts-node 관련 버그 해결)
import { test } from '../../cmd/admin/test';
>>>>>>> cd3e7f95 (v8 뭐 일단 준비해봄, 노래봇 기능 리팩토링)

>>>>>>> 254ee395 (노래봇 진짜 제대로 고친 것 같은데...?? (희망사항))
import { basicAngry } from '../../cmd/basic/basicAngry';
<<<<<<< HEAD
import { basicDate } from '../../cmd/basic/basicDate';
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
=======
>>>>>>> 2ec3eb52 (connection, player 훅 변경)
=======
>>>>>>> 3ce689fd (노래 삭제기능 수정 & 노래 검색함수 수정 & 전체적인 리펙토링)
import { basicDev } from '../../cmd/basic/basicDev';
import { basicDice } from '../../cmd/basic/basicDice';
import { basicGongji } from '../../cmd/basic/basicGongji';
import { basicHelp } from '../../cmd/basic/basicHelp';
<<<<<<< HEAD
<<<<<<< HEAD
import { basicMindul } from '../../cmd/basic/basicMindul';
import { basicSuggestion } from '../../cmd/basic/basicSuggestion';
import { basicTarot } from '../../cmd/basic/basicTarot';
=======
import { basicMendul } from '../../cmd/basic/basicMendul';
=======
>>>>>>> 2ec3eb52 (connection, player 훅 변경)
import { basicMindul } from '../../cmd/basic/basicMindul';
import { basicSuggestion } from '../../cmd/basic/basicSuggestion';
import { basicTarot } from '../../cmd/basic/basicTarot';
<<<<<<< HEAD
import { basicTime } from '../../cmd/basic/basicTime';
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
=======
>>>>>>> 2ec3eb52 (connection, player 훅 변경)

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
<<<<<<< HEAD
  const CmdtoName = (cmdComponent: CMD) => {
=======
  const CmdtoName = (map: Collection<string, string>, cmdComponent: CMD) => {
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
=======
  const CmdtoName = (cmdComponent: CMD) => {
>>>>>>> cd3e7f95 (v8 뭐 일단 준비해봄, 노래봇 기능 리팩토링)
    const cmdList = cmdComponent.cmd;
    const name = cmdComponent.name;
    cmdList.forEach((e: string) => map.set(e, name));
  };

<<<<<<< HEAD
<<<<<<< HEAD
  const putCmd = (cmdComponent: CMD) => {
    CmdtoName(cmdComponent);
    commands.set(cmdComponent.name, cmdComponent);
  };

  //admin
  // putCmd(adminHeapSnapshot);
  // putCmd(test);
<<<<<<< HEAD

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
=======
  const putCmd = (cmdComponent: CMD) => {
    CmdtoName(cmdComponent);
>>>>>>> cd3e7f95 (v8 뭐 일단 준비해봄, 노래봇 기능 리팩토링)
    commands.set(cmdComponent.name, cmdComponent);
  };

  //admin
  putCmd(adminHeapSnapshot);
  putCmd(test);
=======
>>>>>>> 690cd184 (bot 돌아가게는 할 수 있게 수정)

  //basic
  putCmd(basicDev);
  putCmd(basicDice);
  putCmd(basicGongji);
  putCmd(basicHelp);
  putCmd(basicMindul);
  putCmd(basicSuggestion);
  putCmd(basicTarot);

  //music
<<<<<<< HEAD
  putCmd(map, commands, musicEmpty);
  putCmd(map, commands, musicExecute);
  putCmd(map, commands, musicHelp);
  putCmd(map, commands, musicRemove);
  putCmd(map, commands, musicShow);
  putCmd(map, commands, musicShuffle);
  putCmd(map, commands, musicSkip);
  putCmd(map, commands, musicYoutubeSearch);
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
=======
  putCmd(musicEmpty);
  putCmd(musicExecute);
  putCmd(musicHelp);
  putCmd(musicRemove);
  putCmd(musicShow);
  putCmd(musicShuffle);
  putCmd(musicSkip);
  putCmd(musicYoutubeSearch);
>>>>>>> cd3e7f95 (v8 뭐 일단 준비해봄, 노래봇 기능 리팩토링)
};
