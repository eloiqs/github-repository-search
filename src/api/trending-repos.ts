import { fetchRepositories } from '@huchenme/github-trending';
import { Repo } from '../repo';
import { SearchCriteria } from '../search-criteria';
import { toTimeRangeRecurense } from '../time';
import { flatZip } from '../utils';

export async function fetchTrendingRepos(
  searchCriteria: SearchCriteria
): Promise<Repo[]> {
  const since = toTimeRangeRecurense(searchCriteria.timeRange.increments);

  const repos = await Promise.all(
    searchCriteria.languages.length
      ? searchCriteria.languages.map(language => fetchRepos(since, language))
      : [fetchRepos(since)]
  );

  return flatZip(repos);
}

async function fetchRepos(since: string, language?: string): Promise<Repo[]> {
  const repos: TrendingRepo[] = await fetchRepositories(
    language
      ? {
          language,
          since
        }
      : { since }
  );
  return repos.map(createRepo);
}

export type TrendingRepo = {
  name: string;
  url: string;
  author: string;
  avatar: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  currentPeriodStars: number;
  forks: number;
};

function createRepo(trendingRepo: TrendingRepo): Repo {
  return {
    name: trendingRepo.name,
    url: trendingRepo.url,
    owner: {
      name: trendingRepo.author,
      url: `https://github.com/${trendingRepo.author}`,
      avatarUrl: trendingRepo.avatar
    },
    description: trendingRepo.description,
    language: trendingRepo.language,
    languageColor: trendingRepo.languageColor,
    stars: trendingRepo.stars,
    currentPeriodStars: trendingRepo.currentPeriodStars,
    forks: trendingRepo.forks
  };
}
