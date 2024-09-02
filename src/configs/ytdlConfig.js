import ytdl from '@distube/ytdl-core';
import fs from 'fs';

export const ytdlAgent = ytdl.createAgent(
  JSON.parse(fs.readFileSync('src/configs/ytdlCookie.json'), { encoding: 'utf-8' })
);
