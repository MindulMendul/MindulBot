<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { DiscordGatewayAdapterCreator, PlayerSubscription } from '@discordjs/voice';
>>>>>>> 9da67f69 (리스너 관련 문제 해결)
import { NoSubscriberBehavior } from '@discordjs/voice';
import { createAudioPlayer } from '@discordjs/voice';

import { CMD } from '../../types/type';
import { musicCollection } from '../../../bot';
import { Guild, GuildMember, TextChannel } from 'discord.js';
import { VolumeTransformer } from 'prism-media';
import { musicExecuteStreamResource } from '../../hooks/music/musicExecuteStreamResource';
import { musicConnection } from '../../hooks/music/musicExecuteConnection';
import { musicSearch } from '../../hooks/music/musicSearch';
import { metadata } from '../../types/musicType';

export const musicExecute: CMD = {
=======
import { stream } from 'play-dl';
import { MessageActionRow, MessageButton } from 'discord.js';
import { AudioPlayerStatus } from '@discordjs/voice';
=======
import { video_basic_info, stream, search, YouTubeStream } from 'play-dl';
=======
import { video_basic_info, stream, search, YouTubeStream, YouTubeVideo } from 'play-dl';
>>>>>>> af63370e (노래봇 작동은 하는데 왜 되는지는 모름)
=======
import { video_basic_info, stream, search, YouTubeStream } from 'play-dl';
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
=======
import { video_basic_info, stream, search, YouTubeStream, attachListeners, yt_validate } from 'play-dl';
>>>>>>> 8a301808 (노래 검색 기능 수정)
=======
import { video_basic_info, stream, search, YouTubeStream, attachListeners } from 'play-dl';
>>>>>>> 571a0101 (노래봇이 깔끔하게 메모리를 관리할  수 있도록 수정)
=======
import { search, attachListeners } from 'play-dl';
>>>>>>> 2ec3eb52 (connection, player 훅 변경)
=======
import { search } from 'play-dl';
>>>>>>> cbbf3d6f (music 리펙토링중 3)

import { DiscordGatewayAdapterCreator, PlayerSubscription } from '@discordjs/voice';
import { NoSubscriberBehavior } from '@discordjs/voice';
import { joinVoiceChannel } from '@discordjs/voice';
import { createAudioPlayer } from '@discordjs/voice';
<<<<<<< HEAD
>>>>>>> 92fc5a7c (music 부분 고치는 중)
import { createAudioResource } from '@discordjs/voice';
=======
>>>>>>> 2ec3eb52 (connection, player 훅 변경)

import { CMD } from '../../types/type';
import { musicCollection } from '../../../bot';
import { Guild, GuildMember, TextChannel } from 'discord.js';
import { VolumeTransformer } from 'prism-media';
import { musicExecuteStreamResource } from '../../hooks/music/musicExecuteStreamResource';
import { musicConnection } from '../../hooks/music/musicExecuteConnection';
import { musicSearch } from '../../hooks/music/musicSearch';

<<<<<<< HEAD
export const musicExecute: cmd = {
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
=======
export const musicExecute: CMD = {
>>>>>>> af63370e (노래봇 작동은 하는데 왜 되는지는 모름)
  name: '노래',
  cmd: ['노래', '시작', '선곡'],
  type: 'music',
  permission: ['CONNECT', 'SPEAK', 'READ_MESSAGE_HISTORY'], //링크 첨부는 뭐지?
<<<<<<< HEAD
<<<<<<< HEAD
  async execute(msg, args) {
    //써야할 변수 모음
    const guildId = msg.guildId as string;
    const msgMember = msg.member as GuildMember;
    const textChannel = msg.channel as TextChannel;

    //보이스채널 체크부분
    const voiceChannel = msgMember.voice.channel;
    if (!voiceChannel) return textChannel.send('보이스채널에서 해주세요!');

    //검색어 체크부분
    if(!args?.length) return textChannel.send("검색어를 입력해주세요!");
    
    //노래 검색부분
    const searchedInfo = (await musicSearch(args?.join(" "), 1))?.pop();
    if (!searchedInfo) return textChannel.send('검색결과가 없어요 ㅠㅠ 다른 키워드로 다시 시도해보세요!'); // 검색이 안 된 경우
    
    const musicEntity = musicCollection.get(guildId);

    //Guild 체크해서 생성자가 존재하는지 확인하는 곳
    //플레이어가 존재해서 큐에 넣으면 되는 상황
    if (musicEntity) {
      //같은 보이스채널인지 체크
      if (msgMember.voice.channelId != voiceChannel.id) return textChannel.send('같은 보이스채널에서 해주세요!');

      //노래 큐에 넣어주기
      const resource = await musicExecuteStreamResource(searchedInfo as metadata);
      const option = musicEntity.option;
      const volume = resource.volume;
      volume?.setVolume((option.volume / option.volumeMagnification) * Number(!option.mute));
      musicEntity.songQueue.push(resource);

      textChannel.send(`${resource.metadata.title}가 큐에 들어왔어요~`);
    }

    //플레이어가 존재하지 않아 최초로 노래를 틀어줘야 하는 상황
    else {
      //들어가야 하는 항목 전부 넣기
      const audioPlayer = createAudioPlayer({behaviors: {noSubscriber: NoSubscriberBehavior.Pause}});
      const option = {
        volume: 0.5, // 0 ~ 1 사이의 값
        volumeMagnification: 6, // 1/n 배 되는 거라 커질 수록 소리가 작아짐
        mute: false,
        loop: false,
        skip: false
      };
      const resource = await musicExecuteStreamResource(searchedInfo as metadata);
      const volume = resource.volume as VolumeTransformer;
      volume.setVolume(option.volume / option.volumeMagnification); //노래 사운드 최초 설정해주는 곳

      musicCollection.set(guildId, {
        guild: msg.guild as Guild,
        voiceChannel: voiceChannel,
        textChannel: textChannel,
        audioPlayer: audioPlayer,
        playingSong: resource,
        songQueue: [],
        option: option
      });

      musicConnection(guildId, resource);
    }
=======
  async execute(msg: any) {
    //기본 함수
    const subscription = connection.subscription;
    const audioPlayer = connection.subscription.player;
=======
  async execute(msg, args) {
    const guildId = msg.guildId as string;
    const msgMember = msg.member as GuildMember;

    //보이스채널 체크부분
    const voiceChannel = msgMember.voice.channel;
<<<<<<< HEAD
<<<<<<< HEAD
    if (!voiceChannel)
      //보이스채널 체크
<<<<<<< HEAD
      return msg.channel.send('보이스채널에서 해주세요!'); 
>>>>>>> 92fc5a7c (music 부분 고치는 중)
=======
=======
    if (!voiceChannel)//보이스채널 체크
>>>>>>> 982996fa (music 리펙토링중 1)
=======
    if (!voiceChannel)
      //보이스채널 체크
>>>>>>> a468518a (pretter 적용)
      return msg.channel.send('보이스채널에서 해주세요!');
>>>>>>> af63370e (노래봇 작동은 하는데 왜 되는지는 모름)

    //노래 검색부분
    const textChannel = msg.channel as TextChannel;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    const argJoin = args.join(' ');
    if (argJoin == '')//빈 항목 체크
      return textChannel.send('어떤 노래를 틀어야할지 모르겠어요 ㅠㅠ');

<<<<<<< HEAD
<<<<<<< HEAD
    const searched = (await search(searchStr, { source: { youtube: 'video' }, limit: 1 })).pop();
<<<<<<< HEAD
<<<<<<< HEAD
    try {
      if (searched == undefined) throw "noSearched";
    } catch (err) {
      if (err === "noSearched") { // 검색이 안 된 경우
        console.log(`버그 발생부분 => 검색결과가 안 잡힘.\n> searchStr: ${searchStr}\n> searched: ${searched}`);
        return textChannel.send(
          '검색결과가 없네요. 다른 키워드로 다시 시도해보세요!\n만약 유튜브 링크를 검색했다면 링크 뒷부분의 **&list**이후를 지워서 입력해보세요!'
        );
      }
    }

    const playStream = await stream(searched.id) as YouTubeStream;
    const songInfo = (await video_basic_info(searched.id)).video_details;
    const song = {
      title: songInfo.title,
      url: songInfo.url
    };

    const resource = createAudioResource(playStream.stream, {
      metadata: song,
      inlineVolume: true,
      silencePaddingFrames: 5,
      inputType: playStream.type
    });
<<<<<<< HEAD
>>>>>>> 05f2a6cb (pretty한 코드 적용~)
=======

    const musicEntity = musicCollection.get(msg.guildId);

    //Guild 체크해서 생성자가 존재하는지 확인하는 곳
    if (musicEntity === undefined) {
      //플레이어가 존재하지 않아 최초로 노래를 틀어줘야 하는 상황
      const connection = joinVoiceChannel({
        //커넥션 생성
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator
      });
      const audioPlayer = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause
        }
      });

      const subscription = connection.subscribe(audioPlayer);
      const option = {
        volume: 0, // 실제로 쓰이는 값이 아니라 mute용 임시변수
        volumeMagnification: 6, // 1/n 배 되는 거라 커질 수록 소리가 작아짐
        mute: false,
        loop: false,
        skip: false
      };
      resource.volume.setVolume(0.5 / option.volumeMagnification); //노래 사운드 최초 설정해주는 곳

      const entity: musicEntity = {
        guild: msg.guildId,
        voiceChannel: voiceChannel,
        textChannel: textChannel,
        playStream: playStream,
        connection: connection,
        subscription: subscription,
        audioPlayer: audioPlayer,
        songs: [],
        option: option
      }
      musicCollection.set(msg.guildId, entity);

      connection.on(VoiceConnectionStatus.Ready, () => {
        console.log('The connection has entered the Ready state - ready to play audio!');
        musicExecutePlay(msg, entity, resource); //아래에 있는 play함수 호출
      });
=======
    if (searched == undefined) { // 검색이 안 된 경우
=======
=======
    const searchStr = (argJoin.includes('https://www.youtube.com/watch?v='))?
    argJoin.slice(0, 43): argJoin;
    const searched = (await search(searchStr, { source: { youtube: 'video' }, limit:1})).pop();
>>>>>>> 8a301808 (노래 검색 기능 수정)
=======
    const searchStr = argJoin.includes('https://www.youtube.com/watch?v=') ? argJoin.slice(0, 43) : argJoin;
    const searched = (await search(searchStr, { source: { youtube: 'video' }, limit: 1 })).pop();
<<<<<<< HEAD
>>>>>>> d8b8e534 (ts-node 관련 버그 해결)
    if (searched == undefined) {
      // 검색이 안 된 경우
>>>>>>> c7854135 (노래봇 버그 수정 (노래 끝나고 다시 노래 넣을 때 안 들어가던 거 수정))
      console.log(`버그 발생부분 => 검색결과가 안 잡힘.\n> searchStr: ${searchStr}\n> searched: ${searched}`);
      return textChannel.send(
        '검색결과가 없네요. 다른 키워드로 다시 시도해보세요!\n만약 유튜브 링크를 검색했다면 링크 뒷부분의 **&list**이후를 지워서 입력해보세요!'
      );
>>>>>>> af63370e (노래봇 작동은 하는데 왜 되는지는 모름)
    } else {
      const searchedId = searched.id as string;
      const playStream = (await stream(searchedId)) as YouTubeStream;
      const songInfo = (await video_basic_info(searchedId)).video_details;
      const song = {
        title: songInfo.title as string,
        url: songInfo.url
      };
=======
    if (searched == undefined) {// 검색이 안 된 경우
      console.log(`버그 발생부분 => 검색결과가 안 잡힘.\n> searchStr: ${searchStr}\n> searched: ${searched}`);
      return textChannel.send('검색결과가 없어요 ㅠㅠ 다른 키워드로 다시 시도해보세요!');
    }
>>>>>>> 982996fa (music 리펙토링중 1)
=======
    const searched = (await musicSearch(msg, args, 1))?.pop();
=======
    const searched = (await musicSearch(msg, 1, args))?.pop();
<<<<<<< HEAD
>>>>>>> cb4347e6 (자잘한 코드 변경 (아주 조금 최적화))
    if(!searched) return; // 검색이 안 된 경우
>>>>>>> cbbf3d6f (music 리펙토링중 3)
=======
    if (!searched) return; // 검색이 안 된 경우
>>>>>>> a468518a (pretter 적용)

    const searchedId = searched.id as string;
=======
    const searchedInfo = (await musicSearch(msg, 1, args))?.pop();
    if (!searchedInfo) return; // 검색이 안 된 경우
>>>>>>> 586fb489 (defaultIcon 버그 해결)
    const musicEntity = musicCollection.get(guildId);

    //Guild 체크해서 생성자가 존재하는지 확인하는 곳
    if (musicEntity) {
      //플레이어가 존재해서 큐에 넣으면 되는 상황
      if (msgMember.voice.channelId != voiceChannel.id) return msg.channel.send('같은 보이스채널에서 해주세요!');

      const resource = await musicExecuteStreamResource(searchedInfo);

      const option = musicEntity.option;
      const volume = resource.volume;
      volume?.setVolume((0.5 / option.volumeMagnification) * Number(!option.mute));
      musicEntity.songQueue.push(resource);

      msg.channel.send(`${resource.metadata.title}가 큐에 들어왔어요~`);
    } else {
      //플레이어가 존재하지 않아 최초로 노래를 틀어줘야 하는 상황
      const resource = await musicExecuteStreamResource(searchedInfo);

      const connection = joinVoiceChannel({
        //커넥션 생성
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator
      });

      const audioPlayer = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause
        }
      });

      const subscription = connection.subscribe(audioPlayer) as PlayerSubscription;

      const option = {
        volume: 0.5, // 0 ~ 1 사이의 값
        volumeMagnification: 6, // 1/n 배 되는 거라 커질 수록 소리가 작아짐
        mute: false,
        loop: false,
        skip: false
      };

      const volume = resource.volume as VolumeTransformer;
      volume.setVolume(0.5 / option.volumeMagnification); //노래 사운드 최초 설정해주는 곳

      musicCollection.set(guildId, {
        guild: msg.guild as Guild,
        voiceChannel: voiceChannel,
        textChannel: textChannel,
        connection: connection,
        subscription: subscription,
        audioPlayer: audioPlayer,
        playingSong: resource,
        songQueue: [],
        option: option
      });

      musicConnection(guildId, resource);
    }
>>>>>>> 92fc5a7c (music 부분 고치는 중)
  }
};
