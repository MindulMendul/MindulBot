import { CMD } from '../../types/type';
import { spawn } from 'child_process';
import { DiscordGatewayAdapterCreator, joinVoiceChannel } from '@discordjs/voice';
import { VoiceBasedChannel } from 'discord.js';


export const basicTTS: CMD = {
  name: `티티에스`,
  cmd: ['tts', 'TTS','티티에스'],
  type: 'basic',
  permission: [],
  execute(msg) {
    const result=spawn('python3', ['./py/tts.py', msg.content]);

    result.stdout.on('data', (data)=>{
      console.log(data.toString());
    })

    result.stderr.on('data', (data)=>{
      console.log(data.toString());
    });

    const voiceChannel=(msg.member?.voice.channel) as VoiceBasedChannel;
    console.log(voiceChannel);
    console.log(msg.member);

    if(!voiceChannel)
      return msg.channel.send('실패: 보이스채널을 찾지 못 함');
      
    //const connection =
    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator
    });

    //connection?.disconnect(); //커넥션 삭제
    
    return msg.channel.send('tts 테스트중');
  }
};
