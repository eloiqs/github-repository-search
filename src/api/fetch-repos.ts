import { SearchTypes } from '../search-type';
import { fetchMostStarredRepos } from './most-starred-repos';
import { fetchTrendingRepos } from './trending-repos';
import { SearchCriteria } from '../search-criteria';

export function fetchRepos(
  searchType: SearchTypes,
  searchCriteria: SearchCriteria,
  personalAccessToken: string
) {
  switch (searchType) {
    case 'most-starred':
      return fetchMostStarredRepos(searchCriteria, personalAccessToken);
    case 'trending':
      return fetchTrendingRepos(searchCriteria);
  }
}
