import { CMD } from '../../types/type';

export const basicMindul: CMD = {
  name: `민둘`,
  cmd: ['민둘', 'alsenf', '민규', '민바'],
  type: 'basic',
  permission: [],
  async execute(msg) {
    return new Promise(async (resolve, reject)=>{
      await msg.channel.send('민둘이는 바보')
      resolve(undefined); return;
    });
  }
};
