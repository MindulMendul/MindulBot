import { cmd } from "../../type";
let nagaStance = 0;

export const basicNaga: cmd = {
    name: `나가`,
    cmd: ["나가", "skrk", "낙아", "ㄴ가ㅏ", "ㄴㄱ", "나가라고"],
    type: "basic",
    permission: [""],
    async execute(msg) {
        if (msg.guild.name == "Party of Yecheon") {
            if (nagaStance++ >= 3) {
                (await msg.channel.send("안녕히 계세요~"));
                //msg.guild.leave();
            } else msg.channel.send("안나갈 건데? ㅋㅋㅋㅋㅋ" + nagaStance + "트");
        } else {
            msg.channel.send("안녕히 계세요~");
            //msg.guild.leave();
        }
    },
};