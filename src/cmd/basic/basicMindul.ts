import { CMD } from '../../types/type';

export const basicMindul: CMD = {
  name: `민둘`,
  cmd: ['민둘', 'alsenf', '민규', '민바'],
  type: 'basic',
  permission: [],
  execute(msg) {
    return msg.channel.send('민둘이는 바보');
  }
};
