import Octokit, { SearchReposResponseItemsItem } from '@octokit/rest';
import { useCallback, useEffect, useState } from 'react';
import { usePersonalAccessToken } from '../personal-access-token';
import { SearchCriteria } from '../search-criteria';

export function useSearchQuery(searchCriteria: SearchCriteria) {
  const [personalAccessToken] = usePersonalAccessToken('');
  const [repos, setRepos] = useState([] as SearchReposResponseItemsItem[]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(searchCriteriaToQuery(searchCriteria));
  const [sort, setSort] = useState(searchCriteria.sort);

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

  const refresh = useCallback((criteria: SearchCriteria) => {
    setQ(searchCriteriaToQuery(criteria));
    setSort(criteria.sort);
  }, []);

  return [repos, loading, refresh] as [
    SearchReposResponseItemsItem[],
    boolean,
    (criteria: SearchCriteria) => void
  ];
}

function searchCriteriaToQuery(criteria: SearchCriteria) {
  const { from, to } = criteria.timeRange;
  const created = `created:${from}..${to}`;

  if (!criteria.languages.length) return created;

  const languages = criteria.languages.reduce((q, lang) => {
    if (!q.length) return `language:${lang}`;
    return q + `+language:${lang}`;
  }, '');

  return `${languages}+${created}`;
}
