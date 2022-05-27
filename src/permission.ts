<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Message, PermissionResolvable, TextChannel, User } from 'discord.js';
import { bot } from './../bot';
export const checkPermissions = (msg: Message<boolean>, permission: PermissionResolvable[]) => {
  if (!permission[0]) return true;

  const channel = msg.channel as TextChannel;
  const permissions = channel.permissionsFor(bot.user as User);
  if (!permissions) return false;

  let msgPermission = `권한이 없어서 사용할 수가 없어요.\n 현재 필요한 권한의 상태입니다.\n`;
  const msgLen = msgPermission.length;

  permission.forEach((elem) => {
    //console.log(`${elem}: ${permissions.has(elem)}`);
    if (!permissions.has(elem)) msgPermission += `> ${elem} : ${permissions.has(elem)}\n`;
  });

  if (msgPermission.length > msgLen) {
    channel.send(msgPermission);
    return false;
  } else return true;
};
=======
const {bot}=require("./../bot");
async function checkPermissions(msg, permission){
    if(permission[0]=="") return true;
=======
import { Message, PermissionResolvable, TextChannel, User } from "discord.js";
import { bot } from "./../bot";
export const checkPermissions = (msg: Message<boolean>, permission: PermissionResolvable[]) => {
    if(!permission[0]) return true;
>>>>>>> 0aba8f5e (basic 명령어 모두 실행가능하도록 변경)
=======
import { Message, PermissionResolvable, TextChannel, User } from 'discord.js';
import { bot } from './../bot';
export const checkPermissions = (msg: Message<boolean>, permission: PermissionResolvable[]) => {
    if (!permission[0]) return true;
>>>>>>> beffa3af (코드 정렬툴 적용 및 디펜던시 업데이트)

    const channel = msg.channel as TextChannel;
    const permissions = channel.permissionsFor(bot.user as User);
    if (!permissions) return false;

    let msgPermission = `권한이 없어서 사용할 수가 없어요.\n 현재 필요한 권한의 상태입니다.\n`;
    const msgLen = msgPermission.length;

    permission.forEach((elem) => {
        //console.log(`${elem}: ${permissions.has(elem)}`);
        if (!permissions.has(elem)) msgPermission += `> ${elem} : ${permissions.has(elem)}\n`;
    });

    if (msgPermission.length > msgLen) {
        channel.send(msgPermission);
        return false;
    } else return true;
<<<<<<< HEAD
<<<<<<< HEAD
}

module.exports={checkPermissions}
>>>>>>> a8a88ed4 (es6 & ts 화 진행 중 // 아직 버그 있음)
=======
}
>>>>>>> 0aba8f5e (basic 명령어 모두 실행가능하도록 변경)
=======
};
>>>>>>> beffa3af (코드 정렬툴 적용 및 디펜던시 업데이트)
