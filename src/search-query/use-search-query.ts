import Octokit, { SearchReposResponseItemsItem } from '@octokit/rest';
import moment from 'moment';
import { useEffect, useState } from 'react';
import usePersonalAccessToken from '../personal-access-token/use-personal-access-token';
import {
  initialState,
  SearchCriteria,
  TimeRanges,
  useSearchCriteria
} from '../search-criteria';

export default function useSearchQuery() {
  const [personalAccessToken] = usePersonalAccessToken('');
  const [searchCriteria] = useSearchCriteria(initialState);
  const [repos, setRepos] = useState([] as SearchReposResponseItemsItem[]);
  const [loading, setLoading] = useState(false);

  const q = searchCriteriaToQuery(searchCriteria);
  const { sort } = searchCriteria;

  useEffect(() => {
    setLoading(true);
    new Octokit({ auth: personalAccessToken }).search
      .repos({
        q,
        sort
      })
      .then(res => {
        setRepos(res.data.items);
        setLoading(false);
      });
  }, [personalAccessToken, q, sort]);

  return [repos, loading] as [SearchReposResponseItemsItem[], boolean];
}

function searchCriteriaToQuery(criteria: SearchCriteria) {
  const { from, to } = timeRangeToCreatedCriteria(criteria.timeRange);
  const created = `created:${from}..${to}`;

  if (!criteria.languages.length) return created;

  const languages = criteria.languages.reduce((q, lang) => {
    if (!q.length) return `language:${lang}`;
    return q + `+language:${lang}`;
  }, '');

  return `${languages}+${created}`;
}

function timeRangeToCreatedCriteria(
  timeRange: TimeRanges
): { from: string; to: string } {
  switch (timeRange) {
    case 'yearly':
      return {
        from: moment()
          .subtract(1, 'year')
          .format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD')
      };
    case 'monthly':
      return {
        from: moment()
          .subtract(1, 'month')
          .format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD')
      };
    case 'weekly':
      return {
        from: moment()
          .subtract(1, 'week')
          .format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD')
      };
    case 'daily':
      return {
        from: moment()
          .subtract(1, 'day')
          .format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD')
      };
  }
}
