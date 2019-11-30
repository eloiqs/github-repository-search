import { useCallback, useState } from 'react';
import { useMountedState } from 'react-use';
import { searchRepos } from '../api';
import { createSearchCriteria, SearchCriteria } from '../search-criteria';
import { TimeRange } from '../time';
import { createSearch } from './search';
import { createSearchQuery } from './search-query';

export function useInfiniteSearch(
  searchCriteria: SearchCriteria,
  personalAccessToken: string
) {
  const isMounted = useMountedState();
  const [search, setSearch] = useState(createSearch());

  const load = useCallback(async () => {
    setSearch(createSearch([createSearchQuery(searchCriteria.timeRange)]));

    const { data } = await searchRepos(personalAccessToken, searchCriteria);

    if (isMounted()) {
      setSearch(
        createSearch(
          [createSearchQuery(searchCriteria.timeRange, data.items, false)],
          false
        )
      );
    }
  }, [isMounted, personalAccessToken, searchCriteria]);

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

      const { data } = await searchRepos(personalAccessToken, nextCriteria);

      if (isMounted()) {
        setSearch(search => {
          const queries = [
            ...search.queries.filter(query => query !== nextQuery),
            createSearchQuery(timeRange, data.items, false)
          ];
          return createSearch(queries, false);
        });
      }
    },
    [isMounted, personalAccessToken, searchCriteria]
  );

  return [search, load, loadNext] as [
    typeof search,
    typeof load,
    typeof loadNext
  ];
}
