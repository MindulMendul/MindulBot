<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import { bot } from '../../bot';
>>>>>>> beffa3af (코드 정렬툴 적용 및 디펜던시 업데이트)
import moment from 'moment';
import { GuildTextBasedChannel } from 'discord.js';
=======
// import { bot } from '../../bot';
// import moment from 'moment';
// import { GuildTextBasedChannel } from 'discord.js';
>>>>>>> 946bb79f (플래그 알람 없애기 & 봇 어디 틀린 건지 위치 찍기)

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

<<<<<<< HEAD
<<<<<<< HEAD
            const ch = guild.channels.cache
                .filter((channel) => {
                    return channel.name.startsWith('민둘봇');
                })
                .first() as GuildTextBasedChannel;
            if (!ch) return;
            ch.send(reminderMessage).then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 8 * 60 * 1000);
            });
        }
    }, 60 * 1000); // every minutes
<<<<<<< HEAD
}
>>>>>>> 0aba8f5e (basic 명령어 모두 실행가능하도록 변경)
=======
=======
      const ch = guild.channels.cache
        .filter((channel) => {
          return channel.name.startsWith('민둘봇');
        })
        .first() as GuildTextBasedChannel;
      if (!ch) return;
      ch.send(reminderMessage).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 8 * 60 * 1000);
      });
    }
  }, 60 * 1000); // every minutes
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
};
>>>>>>> beffa3af (코드 정렬툴 적용 및 디펜던시 업데이트)
=======
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
>>>>>>> 946bb79f (플래그 알람 없애기 & 봇 어디 틀린 건지 위치 찍기)
