export const myeonRider = async (msg) => {
  if (msg.content.charAt(msg.content.length - 1) == '가') {
    await msg.channel.send('면라이더');
  }
};
