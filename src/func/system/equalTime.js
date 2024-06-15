import moment from 'moment';
export const equalTime = (h, m) => {
  return moment().hour() == h && moment().minute() == m;
};
