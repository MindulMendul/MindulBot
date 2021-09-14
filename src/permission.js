const {bot}=require("./../bot");
async function checkPermissions(msg, permission){
    if(permission[0]=="") return true;

    const permissions=msg.channel.permissionsFor(bot.user);
    
    let msgPermission=`권한이 없어서 사용할 수가 없어요.\n 현재 필요한 권한의 상태입니다.\n`;
    const msgLen=msgPermission.length;
    
    await permission.forEach((elem)=>{
        console.log(`${elem}: ${permissions.has(elem)}`);
        if(!permissions.has(elem))
            msgPermission+=`> ${elem} : ${permissions.has(elem)}\n`;
    });

    if(msgPermission.length>msgLen){
        msg.channel.send(msgPermission);
        return false;
    } else return true;
}

module.exports={checkPermissions}