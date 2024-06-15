import { getVoiceConnection } from '@discordjs/voice';
import { musicCollection } from '../collection/musicCollection.js';

export const testMsg = {
  name: `테스트`,
  cmd: ['테스트', 'ㅌㅅㅌ', 'ㅎ'],
  type: 'basic',
  permission: [],
  async execute(msg, args) {
    // const configiration = new Configuration({
    //   organization: 'Personal',
    //   apiKey: process.env.OPENAI_SECRET_KEY
    // });
    // const openai = new OpenAIApi(configiration);

    return new Promise(async (resolve, reject) => {
      try {
        // const runAPI = async () => {
        //   const response = await openai.createCompletion({
        //     model: 'text-davinci-003',
        //     prompt: 'how can you learn English?',
        //     max_tokens: 300,
        //     temperature: 0.2
        //   });
        //   console.log('- completion:\n' + response.data.choices[0].text);
        //   console.log('\n- total tokens: ' + response.data.usage.total_tokens);
        //   console.log('*- completion ended...');
        // };
        // await runAPI();
        // console.log('running...');

        // resolve(undefined);

        const voiceChannel = msg.member?.voice.channel;
        //console.log(getVoiceConnection(voiceChannel.guild.id));
        const musicEntity = musicCollection.get(msg.channel.guildId);
        // console.log(musicEntity.audioPlayer);
        msg.channel.send('로그 확인');
        resolve(undefined);
      } catch (error) {
        reject(error);
      }
    });
  }
};
