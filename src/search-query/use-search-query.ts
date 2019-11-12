import Octokit, { SearchReposResponseItemsItem } from '@octokit/rest';
import { useEffect, useState } from 'react';
import { usePersonalAccessToken } from '../personal-access-token';
import {
  initialState,
  SearchCriteria,
  useSearchCriteria
} from '../search-criteria';
import { toTimeRange } from '../utils';

export function useSearchQuery() {
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
  const { from, to } = toTimeRange(criteria.timeRangeAbreviation);
  const created = `created:${from}..${to}`;

  if (!criteria.languages.length) return created;

  const languages = criteria.languages.reduce((q, lang) => {
    if (!q.length) return `language:${lang}`;
    return q + `+language:${lang}`;
  }, '');

  return `${languages}+${created}`;
}
