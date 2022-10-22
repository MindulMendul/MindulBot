<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { search } from 'play-dl';

export const musicSearch = async (url: string, limit: number) => {
  return search(url, { source: { youtube: 'video' }, limit: limit });
};
=======
import { Message, TextChannel } from "discord.js";
import { search } from "play-dl";
=======
import { Message, TextChannel } from 'discord.js';
=======
>>>>>>> 3ce689fd (노래 삭제기능 수정 & 노래 검색함수 수정 & 전체적인 리펙토링)
import { search } from 'play-dl';
>>>>>>> a468518a (pretter 적용)

<<<<<<< HEAD
export const musicSearch = async (msg: Message<boolean>, limit: number, args?: string[]) => {
  const textChannel = msg.channel as TextChannel;

  if (!args) {
    textChannel.send('검색어를 입력해주세요!');
    return undefined;
  }

<<<<<<< HEAD
	const argJoin = args.join(' ');
	const searchStr = argJoin.includes('https://www.youtube.com/watch?v=') ? argJoin.slice(32, 43) : argJoin;
	
	const items = (await search(searchStr, { source: { youtube: 'video' }, limit: limit }));
	if (!items.length) {// 검색이 안 된 경우
		textChannel.send('검색결과가 없어요 ㅠㅠ 다른 키워드로 다시 시도해보세요!');
		return undefined;
	} return items;
}
>>>>>>> cbbf3d6f (music 리펙토링중 3)
=======
  const argJoin = args.join(' ');
  const searchStr = argJoin.includes('https://www.youtube.com/watch?v=') ? argJoin.slice(32, 43) : argJoin;

  const items = await search(searchStr, { source: { youtube: 'video' }, limit: limit });
  if (!items.length) {
    // 검색이 안 된 경우
    textChannel.send('검색결과가 없어요 ㅠㅠ 다른 키워드로 다시 시도해보세요!');
    return undefined;
  }
  return items;
=======
export const musicSearch = async (url: string, limit: number) => {
  return search(url, { source: { youtube: 'video' }, limit: limit });
>>>>>>> 3ce689fd (노래 삭제기능 수정 & 노래 검색함수 수정 & 전체적인 리펙토링)
};
>>>>>>> a468518a (pretter 적용)
