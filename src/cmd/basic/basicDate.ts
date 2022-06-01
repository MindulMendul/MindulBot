import { CMD } from '../../types/type';

export const basicDate: CMD = {
  name: `날짜`,
  cmd: ['날짜', 'skfWk', 'ㄴㅉ', 'sW'],
  type: 'basic',
  permission: [],
  async execute(msg) {
    const moment = require('moment');

    if (msg.author.id === process.env.OWNER_ID) msg.reply(moment().format('오늘은 MM월 DD일(dddd) 입니다, 주인님.'));
    else msg.reply('날짜는 달력 찾아봐.');
    return 'cmdFinished';
  }
};
