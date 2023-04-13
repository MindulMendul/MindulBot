import { shuffle } from '../func/system/shuffle';
import { script } from '../assets/tarot/TarotList';

export const alarmTarot = () => {
  return setImmediate(() => {
    shuffle(script);
    setInterval(() => {
      shuffle(script);
    }, 24 * 60 * 60 * 1000); //24시간
  });
};
