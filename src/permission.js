const {bot}=require("./../bot");
function checkPermissions(msg, permission){
    if(permission[0]=="") return true;

    const permissions=msg.channel.permissionsFor(bot.user);
    
    let msgPermission=`권한이 없어서 사용할 수가 없어요.\n 현재 필요한 권한의 상태입니다.\n`;
    let check=false;
    for(i of permission){
        if(!permissions.has(i)){
            msgPermission+=`> ${i} : ${permissions.has(i)}\n`;
            check=true;
        }
    }

    if(check){
        msg.channel.send(msgPermission);
        return false;
    }

    return true;
}

module.exports={checkPermissions}