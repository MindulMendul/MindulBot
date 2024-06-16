import { PermissionsBitField } from 'discord.js';

export const basicDice = {
  name: `주사위`,
  cmd: ['데굴', '데굴데굴', '주사위', 'ㄷㄱㄷㄱ'],
  type: 'basic',
  permission: [PermissionsBitField.Flags.SendMessages],
  async execute(msg) {
    return new Promise(async (resolve, reject) => {
      const catchPhrase = [
        `${msg.member.displayName}님!, 진심을 다해 축하드립니다!!!!`,
        `혼신의 힘을 다해 던졌습니다.`,
        `대충 던졌더니 이렇게 나오네요.`,
        `그냥 던져봤습니다.`,
        `심심해서 던진 거에요.`,
        `이럴 줄은 몰랐죠.`,
        `그래도 나쁘지 않게 나왔습니다.`,
        `이 정도 결과에 만족하세요`,
        `좀 괜찮게 나온 것 같아요`,
        `축하해요!`,
        `이 정도면 높은 숫자라고 생각해요.`,
        `간절히 바라고, 온 우주가 도와줬어요!`,
        `대박 터졌다!`,
        `아 재미없어...`
      ];

      try {
        const res = Math.ceil(Math.random() * 100);
        await msg.channel.send({
          content: `${catchPhrase[Math.floor((res / 100) * catchPhrase.length)]}\n\n${
            msg.member.displayName
          }님의 주사위 결과입니다.\n> ${res}`
        });

        resolve(undefined);
        return;
      } catch (error) {
        reject(error);
      }
    });
  }
};
