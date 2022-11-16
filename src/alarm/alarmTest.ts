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
