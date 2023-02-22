import { search } from 'play-dl';

export const musicSearch = async (url: string, limit: number) => {
  return search(url, { source: { youtube: 'video' }, limit: limit });
};
