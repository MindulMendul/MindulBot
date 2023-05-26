import { Client, Collection, GatewayIntentBits, Partials, ActivityType, ChannelType } from 'discord.js';
import { getCMD, initCMDs } from './src/collection/cmdMap';
import { musicEntity } from './src/types/musicType';
import { initAlarms } from './src/func/system/alarm';
import { checkPERs } from './src/func/system/permission';
import { nocmdVS } from './src/cmd/nocmd/noCmdVS';
import { ACTIVITY_STRING, BOT_TOKEN, PREFIX } from './src/configs/env';
import { getCMDQueue, initCMDQueue, setCMDQueue } from './src/collection/cmdQueue';
import { getOWNER } from './src/func/system/owner';

export const bot = new Client({
  intents: [
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

bot.on('ready', async () => {
  //정상적으로 작동하는지 출력하는 코드
  initCMDs();
  initAlarms();
  console.log(`${bot.user.tag}님이 로그인했습니다.`);
  bot.user.setActivity(ACTIVITY_STRING, { type: ActivityType.Playing });
});

bot.on('messageCreate', async (msg) => {
  //봇은 거름
  if (msg.author.bot) return;

  //DM은 거름
  if (msg.channel.type === ChannelType.DM) {
    msg.channel.send('DM은 막혀있어요, 죄송합니다. ㅠㅠ');
    return;
  }

  //명령어 없는 텍스트는 거름
  if (!msg.content.startsWith(PREFIX)){
    await nocmdVS(msg);
    return;
  }
  
  //필요한 값 선언
  const args = msg.content.trim().slice(PREFIX.length).trim().split(/\s+/); //명령어 말 배열에 담기
  const CMD = getCMD(args.shift()); // 인식할 명령어
  const CMDQueueKey = msg.guild.id; // 명령어큐 구분용 키값
  
  //명령어 인식 못하는 거 거름
  if(CMD==undefined){
    msg.channel.send("명령어를 인식하지 못했어요 ㅠㅠ 명령어를 다시 한 번 확인해주세요!");
    return;
  }

  // 퍼미션 없으면 거름
  const PERs=checkPERs(msg, CMD);
  if(PERs.length>0){
    msg.channel.send(`권한이 없어서 사용할 수가 없어요.\n현재 필요한 권한의 상태입니다.\n${PERs}`);
    return;
  }
  
  //명령어큐가 이미 실행중이면 거름
  if(getCMDQueue(CMDQueueKey)!=undefined){
    msg.channel.send(`${getCMDQueue(CMDQueueKey).name} 명령어 입력 대기 중이라 잠시 뒤에 다시 부탁드립니다 ㅎㅎ`);
    return;
  }

  //길드 명령어큐 만들기
  try{
    //명령어큐를 일단
    console.log("명령어큐 push");
    setCMDQueue(CMDQueueKey, CMD);
    await CMD.execute(msg, args);
  } catch (error) {
    //에러나면 일단 핑 다 찍어주기
    msg.channel.send(`${CMD.name} 명령어 입력에 문제가 생겼어요! 우리 주인님이 고생할 거라 생각하니 기분이 좋네요 ㅎㅎ\n${error}`);
    getOWNER().send(`명령어 입력 문제 : ${error}\n${error.stack}`); 
    console.error(error);
  } finally {
    //대기열 제거
    initCMDQueue(CMDQueueKey);
    console.log("명령어큐 shift");
  }
});

process.on('unhandledRejection', (error) => {
  console.error(error);
  bot.login(BOT_TOKEN);
});

bot.login(BOT_TOKEN);