import moment from 'moment';
export function equalTime(h: number, m: number) {
    return moment().hour() == h && moment().minute() == m;
}
