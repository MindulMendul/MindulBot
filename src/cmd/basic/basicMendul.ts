import { CMD } from '../../types/type';

export const basicMendul: CMD = {
  name: `맨둘`,
  cmd: ['맨둘', 'aesenf'],
  type: 'basic',
  permission: [],
  execute(msg) {
    return msg.channel.send('맨둘이는 집나갔음');
  }
};
