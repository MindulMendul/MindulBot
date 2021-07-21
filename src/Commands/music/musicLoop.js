module.exports = {
	name: "루프",
	cmd: ["루프","반복","loop"],
    type: "music",
    execute(msg){
        const serverQueue = musicQueue.get(msg.guild.id);
        serverQueue.loop=!(serverQueue.loop);
        if(serverQueue.loop)msg.channel.send("큐 반복 기능이 활성화되었습니다~");
        else msg.channel.send("더이상 큐에 있던 녀석들이 반복되지 않아요!");
    }
};