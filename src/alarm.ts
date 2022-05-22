<<<<<<< HEAD
import { alarmTarot } from './alarm/alarmTarot';

export const alarm = () => {
  alarmTarot();
};
=======
import { alarmFlag } from "./alarm/alarmFlag";
import { alarmTarot } from "./alarm/alarmTarot";

export const alarm = ()=>{
    alarmFlag();
    alarmTarot();
}
>>>>>>> 0aba8f5e (basic 명령어 모두 실행가능하도록 변경)
