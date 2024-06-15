export const nocmdVS = async (msg) => {
  if (msg.content.toLocaleLowerCase().includes('vs')) {
    if (msg.content.includes('http')) return;
    const vsArr = [...new Set(msg.content.trim().split(/\s*vs\s*/gim))].filter((elem) => elem.length > 0);
    if (vsArr.length > 0) await msg.channel.send(vsArr[Math.floor(Math.random() * vsArr.length)]);
  }
};
