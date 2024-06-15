import { Collection } from 'discord.js';

import { testMsg } from '../cmd/test.js';

import { basicDev } from '../cmd/basic/basicDev.js';
import { basicDice } from '../cmd/basic/basicDice.js';
import { basicGongji } from '../cmd/basic/basicGongji.js';
import { basicHelp } from '../cmd/basic/basicHelp.js';
import { basicMindul } from '../cmd/basic/basicMindul.js';
import { basicSuggestion } from '../cmd/basic/basicSuggestion.js';
import { basicTarot } from '../cmd/basic/basicTarot.js';
import { basicTTS } from '../cmd/basic/basicTTS.js';

import { musicEmpty } from '../cmd/music/musicEmpty.js';
import { musicExecute } from '../cmd/music/musicExecute.js';
import { musicHelp } from '../cmd/music/musicHelp.js';
import { musicRemove } from '../cmd/music/musicRemove.js';
import { musicShow } from '../cmd/music/musicQueue.js';
import { musicSkip } from '../cmd/music/musicSkip.js';
import { musicYoutubeSearch } from '../cmd/music/musicYoutubeSearch.js';
import { musicSetVolume } from '../cmd/music/musicSetVolume.js';

const CMDNameMap = new Collection(); // CMD와 name 매칭해주는 맵
const CMDMap = new Collection(); // 명령어 모음집

//CMDs 함수
export const initCMDs = () => {
  const initCMD = (CMDObject) => {
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
  initCMD(basicTTS); // 해당 기능은 한 번에 여러 사람이 쓰면 버퍼링이 심해요!

  //music
  initCMD(musicEmpty);
  initCMD(musicExecute);
  initCMD(musicHelp);
  initCMD(musicRemove);
  initCMD(musicShow);
  initCMD(musicSkip);
  initCMD(musicSetVolume);
  initCMD(musicYoutubeSearch);
};

export const getCMD = (CMDName) => {
  return CMDMap.get(CMDNameMap.get(CMDName));
};
