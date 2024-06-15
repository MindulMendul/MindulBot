import { Collection } from 'discord.js';

const CMDQueue = new Collection(); //길드 명령어큐

//CMD Queue 함수
export const initCMDQueue = (key) => {
  CMDQueue.set(key, undefined);
};

export const getCMDQueue = (key) => {
  return CMDQueue.get(key);
};

export const setCMDQueue = (key, value) => {
  CMDQueue.set(key, value);
};
