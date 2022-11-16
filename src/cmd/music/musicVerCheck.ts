import axios from 'axios';
import { load } from 'cheerio';

export const verCheck = async (msg: any) => {
  const url = await axios.get('https://www.npmjs.com/package/play-dl'); //ytdl-core 사이트에 들어감
  const $ = load(url.data); //데이터를 긁어모음
  const html = $('body').children().html(); //열심히 긁어모음
  const dir = `<p class="f2874b88 fw6 mb3 mt2 truncate black-80 f4">`; //버전이 적혀있는 위치를 찾음
  const index = html.indexOf(dir) + dir.length; //그 위치를 수색함
  const dir2 = html.slice(index);
  const latestVersion = dir2.slice(0, dir2.indexOf('</p>'));

  const packageVersion = require('./../../../package.json').dependencies['play-dl'];
  return packageVersion.slice(1) === latestVersion;
};
