<<<<<<< HEAD
<<<<<<< HEAD
import { GuildTextBasedChannel } from 'discord.js';
import { bot } from '../../bot';

setTimeout(() => {
  const asdf = bot.guilds.cache
    .find((guild) => guild.name == '민둘이의 실험방')
    .channels.cache.find((ch) => {
      return ch.name == '순튀봇' && ch.type == 'GUILD_TEXT';
    }) as GuildTextBasedChannel;
  asdf.send('ㅎㅇ');
}, 1000);
=======
import { GuildTextBasedChannel } from "discord.js";
import { bot } from "../../bot"

setTimeout(() => {
    const asdf=bot.guilds.cache.find(guild=>guild.name=="민둘이의 실험방")
    .channels.cache.find(ch=>{return (ch.name=="순튀봇")&&(ch.type=="GUILD_TEXT")}) as GuildTextBasedChannel;
    asdf.send("ㅎㅇ");
}, 1000);
>>>>>>> 0aba8f5e (basic 명령어 모두 실행가능하도록 변경)
=======
import { GuildTextBasedChannel } from 'discord.js';
import { bot } from '../../bot';

setTimeout(() => {
  const asdf = bot.guilds.cache
    .find((guild) => guild.name == '민둘이의 실험방')
    .channels.cache.find((ch) => {
      return ch.name == '순튀봇' && ch.type == 'GUILD_TEXT';
    }) as GuildTextBasedChannel;
  asdf.send('ㅎㅇ');
}, 1000);
>>>>>>> beffa3af (코드 정렬툴 적용 및 디펜던시 업데이트)
