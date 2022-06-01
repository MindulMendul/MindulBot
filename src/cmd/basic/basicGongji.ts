<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> af63370e (노래봇 작동은 하는데 왜 되는지는 모름)
import { CMD } from '../../types/type';
import { bot } from '../../../bot';
import { Guild, TextChannel } from 'discord.js';

export const basicGongji: CMD = {
  name: `공지`,
  cmd: ['공지'],
  type: 'basic',
  permission: [],
  execute(msg) {
    const args = msg.content
      .slice(3, msg.content.length)
      .trim()
      .split(/\s*\/\s*/);
    const guilds = bot.guilds.cache.find((guild: Guild) => {
      //길드 이름 찾기
      return guild.name == args[0];
    }) as Guild;
    const ch = guilds.channels.cache.find((channel) => {
      //서버 이름 찾기
      return channel.name == args[1]; //공지 메시지 보내기
    });
    return (ch as TextChannel).send(args[2]);
  }
};
=======
import { cmd } from "../../type";
import { bot } from "../../../bot";
import { Guild, GuildBasedChannel, TextChannel } from "discord.js";
=======
import { cmd } from '../../type';
import { bot } from '../../../bot';
import { Guild, GuildBasedChannel, TextChannel } from 'discord.js';
>>>>>>> beffa3af (코드 정렬툴 적용 및 디펜던시 업데이트)

export const basicGongji: cmd = {
<<<<<<< HEAD
    name: `공지`,
    cmd: ['공지'],
    type: 'basic',
    permission: [],
    execute(msg) {
        const args = msg.content
            .slice(3, msg.content.length)
            .trim()
            .split(/\s*\/\s*/);
        const guilds = bot.guilds.cache.find((guild: Guild) => {
            //길드 이름 찾기
            return guild.name == args[0];
        }) as Guild;
        const ch = guilds.channels.cache.find((channel) => {
            //서버 이름 찾기
            return channel.name == args[1]; //공지 메시지 보내기
        });
        return (ch as TextChannel).send(args[2]);
<<<<<<< HEAD
	},
    
};
>>>>>>> 0aba8f5e (basic 명령어 모두 실행가능하도록 변경)
=======
    }
=======
  name: `공지`,
  cmd: ['공지'],
  type: 'basic',
  permission: [],
  execute(msg) {
    const args = msg.content
      .slice(3, msg.content.length)
      .trim()
      .split(/\s*\/\s*/);
    const guilds = bot.guilds.cache.find((guild: Guild) => {
      //길드 이름 찾기
      return guild.name == args[0];
    }) as Guild;
    const ch = guilds.channels.cache.find((channel) => {
      //서버 이름 찾기
      return channel.name == args[1]; //공지 메시지 보내기
    });
    return (ch as TextChannel).send(args[2]);
  }
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
};
>>>>>>> beffa3af (코드 정렬툴 적용 및 디펜던시 업데이트)
