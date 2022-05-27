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
