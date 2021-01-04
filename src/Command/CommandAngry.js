async function Commandangry(msg) {
    var msg_edit = msg.channel.messages.cache.find( (message) =>
        message.content=="민둘이는 바보"
    );
    if(msg_edit==undefined){
         msg.channel.send("화내지 마라;;");
    } else {
        while(msg_edit!=undefined){
            (await msg_edit.edit("민둘이는 천재"));//수정 후
            msg_edit = msg.channel.messages.cache.find( (message) =>
                message.content=="민둘이는 바보"
            );//리서치
        }
        msg.channel.send("미안, 뒤에 다 수정함 ㅋㅋ");
    }
}
exports.CommandAngry=Commandangry;