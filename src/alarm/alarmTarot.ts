import moment from 'moment';
<<<<<<< HEAD
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
=======
import { shuffle } from '../func/shuffle';
import { script } from '../assets/tarot/TarotList';
>>>>>>> beffa3af (코드 정렬툴 적용 및 디펜던시 업데이트)

export const alarmTarot = () => {
<<<<<<< HEAD
    return setImmediate(() => {
        shuffle(script);
        setInterval(() => {
            if (moment().hour() == 0) shuffle(script);
        }, 24 * 60 * 60 * 1000); //24시간
    });
<<<<<<< HEAD
}
>>>>>>> 0aba8f5e (basic 명령어 모두 실행가능하도록 변경)
=======
=======
  return setImmediate(() => {
    shuffle(script);
    setInterval(() => {
      if (moment().hour() == 0) shuffle(script);
    }, 24 * 60 * 60 * 1000); //24시간
  });
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
};
>>>>>>> beffa3af (코드 정렬툴 적용 및 디펜던시 업데이트)
