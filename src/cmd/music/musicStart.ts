import { video_basic_info, stream, search } from 'play-dl';

import { VoiceConnectionStatus } from '@discordjs/voice';
import { NoSubscriberBehavior } from '@discordjs/voice';
import { joinVoiceChannel } from '@discordjs/voice';
import { getVoiceConnection } from '@discordjs/voice';
import { createAudioPlayer } from '@discordjs/voice';
import { createAudioResource } from '@discordjs/voice';

import { cmd } from '../../type';

export const musicExecute: cmd = {
  name: '노래',
  cmd: ['노래', '시작', '선곡'],
  type: 'music',
  permission: ['CONNECT', 'SPEAK', 'READ_MESSAGE_HISTORY'], //링크 첨부는 뭐지?
  async execute(msg, args) {
    //보이스채널 체크부분
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel)
      //보이스채널 체크
      return msg.channel.send('보이스채널에서 해주세요!');

    //노래 검색부분
    const textChannel = msg.channel;
    const searchStr = args.join(' ');
    if (searchStr == '')
      //빈 항목 체크
      return textChannel.send('어떤 노래를 틀어야할지 모르겠어요 ㅠㅠ');

    const searched = (await search(searchStr, { source: { youtube: 'video' }, limit: 1 })).pop();
    if (searched == undefined) {
      // 검색이 안 된 경우
      console.log('버그 발생부분 => 검색결과가 안 잡힘.');
      console.log(`searchStr: ${searchStr}`);
      console.log(`searched: ${searched}`);
      return textChannel.send(
        '검색결과가 없네요. 다른 키워드로 다시 시도해보세요!\n만약 유튜브 링크를 검색했다면 링크 뒷부분의 **&list**이후를 지워서 입력해보세요!'
      );
    }
    const playStream = await stream(searched.id);
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

    //Guild 체크해서 생성자가 존재하는지 확인하는 곳
    if (getVoiceConnection(voiceChannel.guild.id) == undefined) {
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
      const songs = [];
      const option = {
        volume: 0, // 실제로 쓰이는 값이 아니라 mute용 임시변수
        volumeMagnification: 6, // 1/n 배 되는 거라 커질 수록 소리가 작아짐
        mute: false,
        loop: false,
        skip: false
      };
      resource.volume.setVolume(0.5 / option.volumeMagnification); //노래 사운드 최초 설정해주는 곳

      connection.on(VoiceConnectionStatus.Ready, () => {
        console.log('The connection has entered the Ready state - ready to play audio!');
        this.play(msg, connection, resource); //아래에 있는 play함수 호출
      });
    } else {
      //플레이어가 존재해서 큐에 넣으면 되는 상황
      const connection = getVoiceConnection(voiceChannel.guild.id);
      if (msg.member.voice.channelId != connection.joinConfig.channelId)
        return msg.channel.send('같은 보이스채널에서 해주세요!');

      songs.push(resource);
      resource.volume.setVolume((0.5 / option.volumeMagnification) * !option.mute); //노래 사운드
      msg.channel.send(`${song.title}가 큐에 들어왔어요~`);
    }
  }
};
