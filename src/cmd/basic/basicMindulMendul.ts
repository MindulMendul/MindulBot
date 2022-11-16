import { CMD } from '../../types/type';

export const basicMindulMendul: CMD = {
  name: `민둘맨둘`,
  cmd: ['민둘맨둘', 'alsenfaosenf', 'ㅁㄷㅁㄷ'],
  type: 'basic',
  permission: [],
  execute(msg) {
    return msg.channel.send('민머리 맨머리 민둘맨둘');
  }
};
