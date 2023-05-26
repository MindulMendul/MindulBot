import { Collection } from 'discord.js';
import { CMD } from '../types/type';

import { testMsg } from '../cmd/test';

import { basicDev } from '../cmd/basic/basicDev';
import { basicDice } from '../cmd/basic/basicDice';
import { basicGongji } from '../cmd/basic/basicGongji';
import { basicHelp } from '../cmd/basic/basicHelp';
import { basicMindul } from '../cmd/basic/basicMindul';
import { basicSuggestion } from '../cmd/basic/basicSuggestion';
import { basicTarot } from '../cmd/basic/basicTarot';
import { basicTTS } from '../cmd/basic/basicTTS';

import { musicEmpty } from '../cmd/music/musicEmpty';
import { musicExecute } from '../cmd/music/musicExecute';
import { musicHelp } from '../cmd/music/musicHelp';
import { musicRemove } from '../cmd/music/musicRemove';
import { musicShow } from '../cmd/music/musicQueue';
import { musicShuffle } from '../cmd/music/musicShuffle';
import { musicSkip } from '../cmd/music/musicSkip';
import { musicYoutubeSearch } from '../cmd/music/musicYoutubeSearch';

const CMDNameMap: Collection<string, string> = new Collection(); // CMD와 name 매칭해주는 맵
const CMDMap: Collection<string, CMD> = new Collection(); // 명령어 모음집

//CMDs 함수
export const initCMDs = () => {
  const initCMD = (CMDObject: CMD) => {
    const CMDList = CMDObject.cmd;
    const name = CMDObject.name;
    CMDList.forEach((e) => CMDNameMap.set(e, name));
    CMDMap.set(CMDObject.name, CMDObject);
  };

  initCMD(testMsg);

  //basic
  initCMD(basicDev);
  initCMD(basicDice);
  initCMD(basicGongji);
  initCMD(basicHelp);
  initCMD(basicMindul);
  initCMD(basicSuggestion);
  initCMD(basicTarot);
  // initCMD(basicTTS); 해당 기능은 버그가 있어요 ㅠㅠ

  //music
  initCMD(musicEmpty);
  initCMD(musicExecute);
  initCMD(musicHelp);
  initCMD(musicRemove);
  initCMD(musicShow);
  initCMD(musicShuffle);
  initCMD(musicSkip);
  initCMD(musicYoutubeSearch);
};

export const getCMD = (CMDName: string) => {
  return CMDMap.get(CMDNameMap.get(CMDName));
}