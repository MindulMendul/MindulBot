import { CMD } from '../types/type';
import { Configuration, OpenAIApi } from 'openai';

export const testMsg: CMD = {
  name: `테스트`,
  cmd: ['테스트', 'ㅌㅅㅌ', 'ㅎ'],
  type: 'basic',
  permission: [],
  async execute(msg, args) {
    const configiration = new Configuration({
      organization: 'Personal',
      apiKey: process.env.OPENAI_SECRET_KEY
    });
    const openai = new OpenAIApi(configiration);

    return new Promise(async (resolve, reject) => {
      try {
        const runAPI = async () => {
          const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: 'how can you learn English?',
            max_tokens: 300,
            temperature: 0.2
          });
          console.log('- completion:\n' + response.data.choices[0].text);
          console.log('\n- total tokens: ' + response.data.usage.total_tokens);
          console.log('*- completion ended...');
        };
        await runAPI();
        console.log('running...');

        resolve(undefined);
      } catch (error) {
        reject(error);
      }
    });
  }
};
