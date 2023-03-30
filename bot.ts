import { config } from 'dotenv';
import moment_timezone from 'moment-timezone';
import {
  Client,
  ClientUser,
  Collection,
  Guild,
  Message,
  TextChannel,
  GatewayIntentBits,
  Partials,
  ActivityType,
  ChannelType
} from 'discord.js';
import { putCommands } from './src/func/system/putCommands';
import { CMD } from './src/types/type';
import { musicEntity } from './src/types/musicType';
import { alarm } from './src/alarm';

import { checkPermissions } from './src/permission';
import { isUndefined } from './src/func/system/isUndefined';

config();
moment_timezone.tz.setDefault('Asia/Seoul'); //서울 시간

const env = process.env as NodeJS.ProcessEnv;

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

const CmdtoNameMap: Collection<string, string> = new Collection(); // cmd와 name 매칭해주는 맵
const commands: Collection<string, CMD> = new Collection(); // 명령어 모음집
export const guildCmdQueue: Collection<string, Array<CMD>> = new Collection(); //길드 명령어큐

export const musicCollection: Collection<string, musicEntity> = new Collection(); // 노래관련 맵

bot.on('ready', async () => {
  //정상적으로 작동하는지 출력하는 코드
  const user = bot.user as ClientUser;
  console.log(`${user.tag}님이 로그인했습니다.`);
  user.setActivity(env.activityString as string, { type: ActivityType.Playing });

  putCommands(CmdtoNameMap, commands);
  alarm();
});

bot.on('messageCreate', async (msg) => {
  if (msg.author.bot) return; //봇은 거름
  if (await noCmd(msg)) return; //명령어 없는 텍스트
  if (msg.channel.type === ChannelType.DM) {
    msg.channel.send('DM은 막혀있어요, 죄송합니다. ㅠㅠ');
    return;
  }
  const PREFIX = env.PREFIX as string;
  const OWNER_ID = env.OWNER_ID as string;
  const args = msg.content.slice(PREFIX.length).trim().split(/\s+/); //명령어 말 배열에 담기
  const command = args.shift() as string; //명령어 인식할 거
  const channel = msg.channel as TextChannel;
  const guild = msg.guild as Guild;
  const getCmd = commands.get(CmdtoNameMap.get(command) as string) as CMD;
  //명령어 인식 못하는 거 거름
  if (isUndefined(getCmd, channel, '명령어를 인식하지 못했어요 ㅠㅠ 명령어를 다시 한 번 확인해주세요!')) return;
  //길드 명령어 큐 만들기
  if (!guildCmdQueue.get(`${guild.id}${getCmd.type}`)) guildCmdQueue.set(`${guild.id}${getCmd.type}`, new Array());
  const checkGuildCmdQueue = guildCmdQueue.get(`${guild.id}${getCmd.type}`) as CMD[];
  try {
    //뭐가 실행 중이면 실행
    if (checkGuildCmdQueue.length)
      msg.channel.send(`${checkGuildCmdQueue[0].name} 명령어 입력 대기 중이라 잠시 뒤에 다시 부탁드립니다 ㅎㅎ`);
    else {
      //아무것도 실행 안 되어 있으면 실행
      checkGuildCmdQueue.push(getCmd); //명령어 입력 중임을 알림
      if (checkPermissions(msg, getCmd.permission) && getCmd.execute) await getCmd.execute(msg, args); //실행이 끝날 때까지 대기
      checkGuildCmdQueue.shift(); //명령어 끝나면 대기열 제거
    }
  } catch (error) {
    const checkGuildCmdQueue = guildCmdQueue.get(`${guild.id}${getCmd.type}`);
    if (checkGuildCmdQueue) checkGuildCmdQueue.shift(); //에러가 났으니 대기열 제거

    channel.send(
      `${command} 명령어 입력에 문제가 생겼어요! 우리 주인님이 고생할 거라 생각하니 기분이 좋네요 ㅎㅎ\n${error}`
    );
    const OWNER = bot.users.cache.get(OWNER_ID);
    if (OWNER) OWNER.send(`명령어 입력 문제 : ${getCmd.name}\n${error}`);
    console.error(error);
  }
});

async function noCmd(msg: Message<boolean>) {
  //명령어 없는 텍스트
  const PREFIX = env.PREFIX as string;
  if (msg.content.toLocaleLowerCase().includes('vs')) {
    //vs 기능
    if (msg.content.includes('https://')) return false;
    else if (msg.content.includes('http://')) return false;
    let vsArr = msg.content.trim().split(/\s*vs\s*/gim); //vs 검색해서 나누기
    vsArr = [...new Set(vsArr)].filter((elem) => elem !== ''); //이거중복임 뜻) 검사한다는 뜻
    if (vsArr.length == 0) msg.channel.send('의미 있는 입력 값이 없네요.'); //아무것도 없으면
    else msg.channel.send(vsArr[Math.floor(Math.random() * vsArr.length)]); //랜덤해서 하나 보내기
    return true;
  } else if (!msg.content.startsWith(PREFIX)) {
    return true;
  }
  return false;
}

bot.on('error', (error) => {
  console.log(error);
});

process.on('unhandledRejection', (err) => {
  //app crash걸렸을 때 실행되는 코드
  const OWNER_ID = env.OWNER_ID as string;
  const OWNER = bot.users.cache.get(OWNER_ID);
  if (OWNER) OWNER.send(`에러떴다ㅏㅏㅏㅏㅏ\n${err}\n`);
  console.error(err);
});

bot.login(env.BOT_TOKEN);
