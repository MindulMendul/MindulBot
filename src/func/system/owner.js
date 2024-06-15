import { bot } from '../../../bot.js';
import { OWNER_ID } from '../../configs/env.js';

export const getOWNER = () => {
  return bot.users.cache.get(OWNER_ID);
};

export const isOWNER = (user) => {
  return user == getOWNER();
};
