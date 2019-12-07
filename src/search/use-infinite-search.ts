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

  useEffect(() => {
    load();
  }, [load]);

  const loadNext = useCallback(async () => {
    const nextTimeRange = createTimeRange(
      searchCriteria.timeRange.increments,
      search.queries.length
    );

    const nextQuery = createSearchQuery(nextTimeRange);
    setSearch(search => {
      const queries = [...search.queries, nextQuery];
      return createSearch(queries, search.loading);
    });

    const nextCriteria = createSearchCriteria(
      searchCriteria.languages,
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
    isMounted,
    personalAccessToken,
    search.queries.length,
    searchCriteria.languages,
    searchCriteria.timeRange.increments,
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

  return [search, load, loadNext] as const;
}
