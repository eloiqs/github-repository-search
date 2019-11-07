import { SearchReposParams } from '@octokit/rest';
import moment from 'moment';
import createPersistedState from 'use-persisted-state';

export default createPersistedState('grs-search-criteria');

export type SearchCriteria = Omit<SearchReposParams, 'q'> & {
  languages: string[];
  created: {
    from: string;
    to: string;
  };
};

export const initialState: SearchCriteria = {
  sort: 'stars',
  languages: [],
  created: {
    from: moment()
      .subtract(1, 'month')
      .format('YYYY-MM-DD'),
    to: moment().format('YYYY-MM-DD')
  },
  order: 'desc',
  page: 0,
  per_page: 20
};
