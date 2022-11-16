import moment from 'moment';
export function equalTime(h, m) {
    return (moment().hour()==h && moment().minute()==m);
}