import { Message, TextChannel } from "discord.js";
import { search } from "play-dl";

export const musicSearch = async (msg: Message<boolean>, args:string[], limit:number) => {
	const textChannel  = msg.channel as TextChannel;

	if (!args.length){
		textChannel.send('검색어를 입력해주세요!');
		return undefined;
	}

	const argJoin = args.join(' ');
	const searchStr = argJoin.includes('https://www.youtube.com/watch?v=') ? argJoin.slice(32, 43) : argJoin;
	
	const items = (await search(searchStr, { source: { youtube: 'video' }, limit: limit }));
	if (!items.length) {// 검색이 안 된 경우
		textChannel.send('검색결과가 없어요 ㅠㅠ 다른 키워드로 다시 시도해보세요!');
		return undefined;
	} return items;
}