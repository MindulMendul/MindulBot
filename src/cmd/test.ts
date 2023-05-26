import { musicCollection } from '../collection/musicCollection';
import { OWNER_ID } from '../configs/env';
import { CustomError } from '../configs/error';
import { isOWNER } from '../func/system/owner';
import { CMD } from '../types/type';

export const testMsg: CMD = {
  name: `테스트`,
  cmd: ['테스트', 'ㅌㅅㅌ', 'ㅎ'],
  type: 'basic',
  permission: [],
  async execute(msg, args) {
    return new Promise((resolve, reject)=>{
      const musicEntity=musicCollection.get(msg.guildId);
      console.log(musicEntity?.playingSong.volume.volumeDecibels);
      resolve(undefined);
      // if (!isOWNER(msg.author)) return resolve(undefined);
      // console.log("1");
      // resolve(undefined);
      // setTimeout(()=>{
      //   console.log("3");
      //   resolve(newFunction(msg));
      // },3000);
    });
  }
};

const newFunction=(msg:any)=>{
  console.log("2");
  throw new CustomError("e");
}