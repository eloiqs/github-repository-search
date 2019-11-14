import { SearchReposParams } from '@octokit/rest';
import createPersistedState from 'use-persisted-state';
import { TimeRange, toTimeRange } from '../time';

export type SearchCriteria = Omit<SearchReposParams, 'q'> & {
  languages: string[];
  timeRange: TimeRange;
};

export const initialState: SearchCriteria = {
  sort: 'stars',
  languages: [],
  timeRange: toTimeRange('yearly'),
  order: 'desc',
  page: 0,
  per_page: 20
};

const usePersistedSearchCriteria = createPersistedState('grs-search-criteria');

export function useSearchCriteria() {
  return usePersistedSearchCriteria(initialState);
}
