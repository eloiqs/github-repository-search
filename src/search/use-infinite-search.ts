import { useCallback, useState } from 'react';
import { useMountedState } from 'react-use';
import { fetchRepos } from '../api';
import { usePersonalAccessToken } from '../personal-access-token';
import { createSearchCriteria, useSearchCriteria } from '../search-criteria';
import { useSearchType } from '../search-type';
import { TimeRange } from '../time';
import { createSearch } from './search';
import { createSearchQuery } from './search-query';

export function useInfiniteSearch() {
  const isMounted = useMountedState();
  const [personalAccessToken] = usePersonalAccessToken();
  const [searchType] = useSearchType();
  const [searchCriteria] = useSearchCriteria();
  const [search, setSearch] = useState(createSearch());

  const load = useCallback(async () => {
    setSearch(createSearch([createSearchQuery(searchCriteria.timeRange)]));

    const repos = await fetchRepos(
      searchType,
      searchCriteria,
      personalAccessToken
    );

    if (isMounted()) {
      setSearch(
        createSearch(
          [createSearchQuery(searchCriteria.timeRange, repos, false)],
          false
        )
      );
    }
  }, [isMounted, personalAccessToken, searchCriteria, searchType]);

  const loadNext = useCallback(
    async (timeRange: TimeRange) => {
      const nextQuery = createSearchQuery(timeRange);
      setSearch(search => {
        const queries = [...search.queries, nextQuery];
        return createSearch(queries, search.loading);
      });

      const nextCriteria = createSearchCriteria(
        searchCriteria.languages,
        timeRange
      );

      const repos = await fetchRepos(
        searchType,
        nextCriteria,
        personalAccessToken
      );

      if (isMounted()) {
        setSearch(search => {
          const queries = [
            ...search.queries.filter(query => query !== nextQuery),
            createSearchQuery(timeRange, repos, false)
          ];
          return createSearch(queries, false);
        });
      }
    },
    [isMounted, personalAccessToken, searchCriteria.languages, searchType]
  );

  return [search, load, loadNext] as [
    typeof search,
    typeof load,
    typeof loadNext
  ];
}
