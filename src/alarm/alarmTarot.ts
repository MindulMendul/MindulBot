import moment from 'moment';
<<<<<<< HEAD
import { shuffle } from '../hooks/system/shuffle';
import { script } from '../assets/tarot/TarotList';

export const alarmTarot = () => {
  return setImmediate(() => {
    shuffle(script);
    setInterval(() => {
      if (moment().hour() == 0) shuffle(script);
    }, 24 * 60 * 60 * 1000); //24시간
  });
};
=======
import { shuffle } from '../func/shuffle'
import { script } from '../assets/tarot/TarotList'

export const alarmTarot = () => {
    return setImmediate(() => {
        shuffle(script);
        setInterval(() => {
            if (moment().hour() == 0)
                shuffle(script);
        }, 24 * 60 * 60 * 1000)//24시간
    });
}
>>>>>>> 0aba8f5e (basic 명령어 모두 실행가능하도록 변경)
