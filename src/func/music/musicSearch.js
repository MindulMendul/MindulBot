import { search } from 'play-dl';

export const musicSearch = async (url, limit) => {
  return search(url, { source: { youtube: 'video' }, limit: limit });
};
