export const myeonRider = async (msg) => {
  console.log(msg.content.charAt(msg.content.length - 1));
  if (msg.content.charAt(msg.content.length - 1) == '가') {
    await msg.channel.send('면라이더');
  }
};
