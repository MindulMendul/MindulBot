import moment from 'moment';
export const equalTime = (h: number, m: number) => {
  return moment().hour() == h && moment().minute() == m;
}
