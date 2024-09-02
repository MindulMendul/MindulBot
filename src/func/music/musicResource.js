import { createAudioResource } from '@discordjs/voice';
import ytdl from '@distube/ytdl-core';
import { ytdlAgent } from '../../configs/ytdlConfig.js';
import { stream } from 'play-dl';

export const musicResource = async (musicEntity, metadata) => {
  const ytdlOption = {
    agent: ytdlAgent,
    filter: 'audioonly',
    fmt: 'mp3',
    highWaterMark: 1 << 62,
    liveBuffer: 1 << 62,
    dlChunkSize: 0,
    bitrate: 128,
    quality: 'lowestaudio',
    requestOptions: {
      maxRedirections: 5,
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
      }
    }
  };

  const playStream = ytdl(metadata.url, ytdlOption);
  //const playStream = (await stream(metadata.url, { discordPlayerCompatibility: true })).stream;
  const resource = createAudioResource(playStream, {
    metadata: {
      title: metadata.title,
      url: metadata.url
    },
    inlineVolume: true,
    silencePaddingFrames: 5
  });

  resource.volume.setVolumeLogarithmic(
    musicEntity.option.ampl * musicEntity.option.volume * Number(!musicEntity.option.mute)
  );

  return resource;
};
