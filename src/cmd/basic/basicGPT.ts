import { CMD } from '../../types/type';
import { Configuration, OpenAIApi } from 'openai';

export const testMsg: CMD = {
  name: `테스트`,
  cmd: ['테스트', 'ㅌㅅㅌ', 'ㅎ'],
  type: 'basic',
  permission: [],
  async execute(msg, args) {
    return new Promise((resolve, reject) => {
      msg.channel.send('aswdfasdf');
      try {
        const configiration = new Configuration({
          apiKey: process.env.OPENAI_SECRET_KEY
        });
        console.log('<<--- Hello Node.js ---->>');
        console.log('...openai api tutorial...');

        const openai = new OpenAIApi(configiration);

        const runAPI = async () => {
          const response = await openai.listModels();
          const models = response.data.data;

          for (let i = 0; i < models.length; i++) {
            console.log(i + ' : ' + models[i].id);
          }
        };
        runAPI();
        console.log('running...');

        resolve(undefined);
      } catch (error) {
        reject(error);
      }
    });
  }
};
