<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import { cmd } from "../../type";

export const basicMindul: cmd = {
	name: `민둘`,
	cmd: ["민둘", "alsenf", "민규", "민바"],
	type: "basic",
	permission: [],
	execute(msg) {
		return msg.channel.send('민둘이는 바보');
	},
};
>>>>>>> 0aba8f5e (basic 명령어 모두 실행가능하도록 변경)
=======
import { cmd } from '../../type';
=======
import { CMD } from '../../types/type';
>>>>>>> af63370e (노래봇 작동은 하는데 왜 되는지는 모름)

export const basicMindul: CMD = {
  name: `민둘`,
  cmd: ['민둘', 'alsenf', '민규', '민바'],
  type: 'basic',
  permission: [],
  execute(msg) {
    return msg.channel.send('민둘이는 바보');
  }
};
>>>>>>> beffa3af (코드 정렬툴 적용 및 디펜던시 업데이트)
