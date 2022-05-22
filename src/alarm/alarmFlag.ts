<<<<<<< HEAD
// import { bot } from '../../bot';
// import moment from 'moment';
// import { GuildTextBasedChannel } from 'discord.js';

// 기본길드 전용 알람(현재는 그럼)
// export const alarmFlag = () => {
//   return setInterval(() => {
//     if (moment().minute() == 25) {
//       //매 시간 25분마다 알람
//       const reminderMessage = `${moment().hour()}시 플래그하러 가세요~`;
//       const guild = bot.guilds.cache
//         .filter((guild) => {
//           return guild.name === '💛 기본 💛';
//         })
//         .first();
//       if (!guild) return;

//       const ch = guild.channels.cache
//         .filter((channel) => {
//           return channel.name.startsWith('민둘봇');
//         })
//         .first() as GuildTextBasedChannel;
//       if (!ch) return;
//       ch.send(reminderMessage).then((msg) => {
//         setTimeout(() => {
//           msg.delete();
//         }, 8 * 60 * 1000);
//       });
//     }
//   }, 60 * 1000); // every minutes
// };
=======
import { bot } from "../../bot"
import moment from 'moment';
import { GuildTextBasedChannel } from "discord.js";

//기본길드 전용 알람(현재는 그럼)
export const alarmFlag = () => {
    return setInterval(() => {
        if (moment().minute() == 25) {//매 시간 25분마다 알람
            const reminderMessage = `${moment().hour()}시 플래그하러 가세요~`;
            const guild = bot.guilds.cache.filter((guild) => { return (guild.name === "💛 기본 💛"); }).first();
            if (!guild) return;

            const ch = guild.channels.cache.filter((channel) => { return (channel.name.startsWith('민둘봇')); }).first() as GuildTextBasedChannel;
            if (!ch) return;
            ch.send(reminderMessage).then(msg => { setTimeout(() => { msg.delete(); }, 8 * 60 * 1000); });
        }
    }, 60 * 1000); // every minutes
}
>>>>>>> 0aba8f5e (basic 명령어 모두 실행가능하도록 변경)
