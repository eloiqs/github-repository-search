import { SearchReposParams } from '@octokit/rest';
import createPersistedState from 'use-persisted-state';

export type SearchCriteria = Omit<SearchReposParams, 'q'> & {
  languages: string[];
  timeRangeAbreviation: TimeRangeAbreviation;
};

export type TimeRangeAbreviation = 'yearly' | 'monthly' | 'weekly' | 'daily';

export const initialState: SearchCriteria = {
  sort: 'stars',
  languages: [],
  timeRangeAbreviation: 'yearly',
  order: 'desc',
  page: 0,
  per_page: 20
};

export const useSearchCriteria = createPersistedState('grs-search-criteria');
