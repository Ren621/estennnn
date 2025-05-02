
import { TorrentResult, TorrentQuery, SearchFunction, Accuracy } from './types';

export const search: SearchFunction = async (query: TorrentQuery) => {
  const { titles, resolution, exclusions, type } = query;

  // Replace this URL with Nyaa.si's actual API or scraping logic
  const url = `https://nyaa.si/?f=0&c=0_0&q=${titles.join("+")}&l=0&v=0&min=1&max=0&category=1_2&resolution=${resolution}&media=${type}`;

  // Implement your fetching and parsing logic
  const torrents: TorrentResult[] = await fetch(url)
    .then(response => response.json())
    .then(data => {
      return data.map(item => ({
        title: item.title,
        link: item.torrentLink,
        seeders: item.seeders,
        leechers: item.leechers,
        downloads: item.downloads,
        hash: item.hash,
        size: item.size,
        date: new Date(item.date),
        accuracy: 'high',
      }));
    });

  return torrents.sort((a, b) => b.seeders - a.seeders);
};

export const TorrentSource = {
  test: async () => true,
  single: search,
  batch: search,
  movie: search,
};
