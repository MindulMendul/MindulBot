import { CMD } from '../../types/type';
import { spawn } from 'child_process';
import { AudioPlayerStatus, createAudioResource, getVoiceConnection, joinVoiceChannel, PlayerSubscription } from '@discordjs/voice';
import { VoiceBasedChannel, PermissionsBitField } from 'discord.js';
import { createAudioPlayer, NoSubscriberBehavior } from '@discordjs/voice';
import fs from 'fs';

const env = process.env as NodeJS.ProcessEnv;

export const basicTTS: CMD = {
  name: `티티에스`,
  cmd: ['tts', 'TTS', '티티에스', 'ㅅㅅㄴ', 'ㅌㅌㄴ', 'ㅌㅌㅇㅅ'],
  type: 'basic',
  permission: [PermissionsBitField.Flags.SendMessages],
  async execute(msg, args) {
    //검색어 체크부분
    if(!args?.length)
      return msg.channel.send('어떤 문장을 읽어야할지 모르겠어요!');
    
    //보이스에는 들어와있어야 tts를 들을 수 있음
    const voiceChannel = msg.member?.voice.channel as VoiceBasedChannel;
    if(!voiceChannel)
      return msg.channel.send('보이스채널에서 해주세요!');

    //보이스 들어가기 위한 코드
    if(getVoiceConnection(voiceChannel.guild.id)!=undefined)
      return msg.channel.send('해당 기능은 이미 보이스채널에 들어와있다면 작동하지 않습니다 ㅠㅠ');

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator as any
    });

    const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });
    const subscribe = connection.subscribe(player) as PlayerSubscription;
    const ttsQueue = new Array();
    const filenameQueue = new Array();
    player.on(AudioPlayerStatus.Idle, async () => {
      fs.unlinkSync(filenameQueue.shift());
      if (ttsQueue.length) {
        player.play(ttsQueue.shift());
      } else {
        player.removeAllListeners();
        subscribe.unsubscribe();
        connection.disconnect();
        connection.destroy();
      }
    });

    //python에서부터 받아온 파일을 mp3로 저장 후 실행
    let cnt=0;
    const ttsPY = spawn('python3', ['./src/py/tts.py', args.join(' ')]);
    ttsPY.stdout.on('data', (data) => {
      const base64 = data.toString().trim().slice(2, -1);
      if (base64.length) {
        const filename = `./src/assets/ttsFile/${voiceChannel.id}${cnt++}.mp3`;
        fs.writeFileSync(filename, Buffer.from(base64, 'base64'));
        const resource = createAudioResource(filename);
        filenameQueue.push(filename);
        if (player.state.status == 'idle') {
          player.play(resource);
        } else {
          ttsQueue.push(resource);
        }
      }
    });
    ttsPY.stderr.on('data', (data) => {
      console.log(data.toString());
    });

    return msg.channel.send('tts 테스트중');
  }
};
