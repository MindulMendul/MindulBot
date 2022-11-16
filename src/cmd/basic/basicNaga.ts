import { Guild, TextChannel } from "discord.js";
import { cmd } from "../../type";
let nagaStance = 0;

export const basicNaga: cmd = {
    name: `나가`,
    cmd: ["나가", "skrk", "낙아", "ㄴ가ㅏ", "ㄴㄱ", "나가라고"],
    type: "basic",
    permission: [],
    async execute(msg) {
        const guild = msg.guild as Guild;
        const channel = msg.channel as TextChannel;
        
        if (guild.name == "Party of Yecheon") {
            if (nagaStance++ >= 3) {
                (await channel.send("안녕히 계세요~"));
                //msg.guild.leave();
            } else channel.send("안나갈 건데? ㅋㅋㅋㅋㅋ" + nagaStance + "트");
        } else {
            channel.send("안녕히 계세요~");
            //msg.guild.leave();
        }
    },
};