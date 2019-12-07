import { useCallback, useEffect, useState } from 'react';
import { useMountedState, useWindowScroll } from 'react-use';
import { fetchRepos } from '../api';
import { usePersonalAccessToken } from '../personal-access-token';
import { createSearchCriteria, useSearchCriteria } from '../search-criteria';
import { useSearchType } from '../search-type';
import { createTimeRange } from '../time';
import { createSearch } from './search';
import { createSearchQuery } from './search-query';

export function useInfiniteSearch(loadNextOnScroll = true) {
  const isMounted = useMountedState();
  const { personalAccessToken } = usePersonalAccessToken();
  const { searchType } = useSearchType();
  const { getSearchCriteria } = useSearchCriteria();
  const [search, setSearch] = useState(createSearch());

  const load = useCallback(async () => {
    setSearch(createSearch([createSearchQuery(getSearchCriteria().timeRange)]));

    const repos = await fetchRepos(
      searchType,
      getSearchCriteria(),
      personalAccessToken
    );

    if (isMounted()) {
      setSearch(
        createSearch(
          [createSearchQuery(getSearchCriteria().timeRange, repos, false)],
          false
        )
      );
    }
  }, [getSearchCriteria, isMounted, personalAccessToken, searchType]);

  useEffect(() => {
    load();
  }, [load]);

  const loadNext = useCallback(async () => {
    const nextTimeRange = createTimeRange(
      getSearchCriteria().timeRange.increments,
      search.queries.length
    );

    const nextQuery = createSearchQuery(nextTimeRange);
    setSearch(search => {
      const queries = [...search.queries, nextQuery];
      return createSearch(queries, search.loading);
    });

    const nextCriteria = createSearchCriteria(
      getSearchCriteria().languages,
      nextTimeRange
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
          createSearchQuery(nextTimeRange, repos, false)
        ];
        return createSearch(queries, false);
      });
    }
  }, [
    getSearchCriteria,
    isMounted,
    personalAccessToken,
    search.queries.length,
    searchType
  ]);

  const windowScroll = useWindowScroll();

  useEffect(() => {
    if (!loadNextOnScroll) return;

    if (search.loading || search.queries.some(query => query.loading)) return;

    if (
      window.innerHeight + windowScroll.y >=
      document.documentElement.offsetHeight
    ) {
      loadNext();
    }
  }, [
    loadNext,
    loadNextOnScroll,
    search.loading,
    search.queries,
    windowScroll.y
  ]);

  return { search, load, loadNext } as const;
}
