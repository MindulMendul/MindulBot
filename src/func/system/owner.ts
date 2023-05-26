import { User } from "discord.js";
import { bot } from "../../../bot";
import { OWNER_ID } from "../../configs/env"

export const getOWNER = () => {
  return bot.users.cache.get(OWNER_ID);
}

export const isOWNER = (user: User) => {
  return user==getOWNER();
}