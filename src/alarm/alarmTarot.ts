import moment from 'moment';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { shuffle } from '../hooks/system/shuffle';
=======
import { shuffle } from '../hooks/app/shuffle';
>>>>>>> 92fc5a7c (music 부분 고치는 중)
=======
import { shuffle } from '../hooks/system/shuffle';
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
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
