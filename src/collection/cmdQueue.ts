import { Collection } from 'discord.js';
import { CMD } from '../types/type';

const CMDQueue: Collection<string, CMD> = new Collection(); //길드 명령어큐

//CMD Queue 함수
export const initCMDQueue = (key: string) => {
  CMDQueue.set(key, undefined);
};

export const getCMDQueue = (key: string) => {
  return CMDQueue.get(key);
};

export const setCMDQueue = (key: string, value: CMD) => {
  CMDQueue.set(key, value);
};
