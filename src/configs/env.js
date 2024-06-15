import { config } from 'dotenv';
config();

const env = process.env;
export const OWNER_ID = env.OWNER_ID;
export const PREFIX = env.PREFIX;
export const ACTIVITY_STRING = env.ACTIVITY_STRING;
export const BOT_TOKEN = env.BOT_TOKEN;
