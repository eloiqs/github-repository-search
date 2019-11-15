import Octokit, { SearchReposResponseItemsItem } from '@octokit/rest';
import { useEffect, useState } from 'react';
import { usePersonalAccessToken } from '../personal-access-token';
import { SearchCriteria } from '../search-criteria';

type SearchQuery = {
  repos: SearchReposResponseItemsItem[];
  isLoading: boolean;
};

const initialState: SearchQuery = { repos: [], isLoading: true };

export function useSearchQuery(searchCriteria: SearchCriteria): SearchQuery {
  const [personalAccessToken] = usePersonalAccessToken('');
  const [query, setQuery] = useState(initialState);

  const q = searchCriteriaToQuery(searchCriteria);
  const { sort } = searchCriteria;

  useEffect(() => {
    setQuery(initialState);
    new Octokit({ auth: personalAccessToken }).search
      .repos({
        q,
        sort
      })
      .then(({ data }) => {
        setQuery({
          repos: data.items,
          isLoading: false
        });
      });
  }, [personalAccessToken, q, sort]);

  return query;
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
