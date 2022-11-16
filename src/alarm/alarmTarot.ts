import moment from 'moment';
import { shuffle } from '../hooks/app/shuffle';
import { script } from '../assets/tarot/TarotList';

export const alarmTarot = () => {
  return setImmediate(() => {
    shuffle(script);
    setInterval(() => {
      if (moment().hour() == 0) shuffle(script);
    }, 24 * 60 * 60 * 1000); //24시간
  });
};
