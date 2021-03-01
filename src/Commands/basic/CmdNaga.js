var nagaStance=0;

async function Commandnaga(msg) {
    if (msg.guild.name === "Party of Yecheon") {
        if (nagaStance++ >= 3) {
            (await msg.channel.send("안녕히 계세요~"));
            msg.guild.leave();
        } else {
            msg.channel.send("안나갈 건데? ㅋㅋㅋㅋㅋ" + nagaStance + "트");
        }
    } else {
        msg.channel.send("안녕히 계세요~");
        //msg.guild.leave();
    }
};

exports.CommandNaga=Commandnaga;