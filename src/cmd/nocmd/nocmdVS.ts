import { Message } from 'discord.js';
export const nocmdVS = async (msg: Message<boolean>) => {
  if (msg.content.toLocaleLowerCase().includes('vs')) {
    if (msg.content.includes('http')) return true;
    let vsArr = msg.content.trim().split(/\s*vs\s*/gim); //vs 검색해서 나누기
    vsArr = [...new Set(vsArr)].filter((elem) => elem !== ''); //이거중복임 뜻) 검사한다는 뜻
    if (vsArr.length == 0) msg.channel.send('의미 있는 입력 값이 없네요.'); //아무것도 없으면
    else msg.channel.send(vsArr[Math.floor(Math.random() * vsArr.length)]); //랜덤해서 하나 보내기
  }
};
