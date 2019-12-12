import { useCallback, useState } from 'react';
import { useMountedState } from 'react-use';
import { fetchRepos } from '../api';
import { usePersonalAccessToken } from '../personal-access-token';
import {
  createSearchCriteria,
  useSearchCriteria,
  SearchCriteria
} from '../search-criteria';
import { useSearchType } from '../search-type';
import { createTimeRange } from '../time';
import { createSearch, Search } from './search';
import { createSearchQuery } from './search-query';
import { Repo } from '../repo';

type FetchSearchConfig = {
  searchCriteria: SearchCriteria;
  getLoadingState(state: Search): Search;
  getResolvedState(repos: Repo[], state: Search): Search;
};

export function useInfiniteSearch() {
  const isMounted = useMountedState();
  const { personalAccessToken } = usePersonalAccessToken();
  const { searchType } = useSearchType();
  const { getSearchCriteria } = useSearchCriteria();
  const [searchState, setSearchState] = useState(createSearch([], true));

  const fetchSearch = useCallback(
    async ({
      searchCriteria,
      getLoadingState,
      getResolvedState
    }: FetchSearchConfig) => {
      setSearchState(state => getLoadingState(state));

      const repos = await fetchRepos(
        searchType,
        searchCriteria,
        personalAccessToken
      );

      if (isMounted()) {
        setSearchState(state => getResolvedState(repos, state));
      }
    },
    [isMounted, personalAccessToken, searchType]
  );

  const fetchInitialSearch = useCallback(async () => {
    fetchSearch({
      searchCriteria: getSearchCriteria(),
      getLoadingState: () =>
        createSearch(
          [createSearchQuery(getSearchCriteria().timeRange, true)],
          true
        ),
      getResolvedState: repos =>
        createSearch(
          [createSearchQuery(getSearchCriteria().timeRange, false, repos)],
          false
        )
    });
  }, [fetchSearch, getSearchCriteria]);

  const fetchNextSearch = useCallback(async () => {
    const nextTimeRange = createTimeRange(
      getSearchCriteria().timeRange.increments,
      searchState.queries.length
    );

    const nextQuery = createSearchQuery(nextTimeRange, true);

    fetchSearch({
      searchCriteria: createSearchCriteria(
        getSearchCriteria().languages,
        nextTimeRange
      ),
      getLoadingState: search => {
        const queries = [...search.queries, nextQuery];
        return createSearch(queries, search.loading);
      },
      getResolvedState: (repos, search) => {
        const queries = [
          ...search.queries.filter(query => query !== nextQuery),
          createSearchQuery(nextTimeRange, false, repos)
        ];
        return createSearch(queries, false);
      }
    });
  }, [fetchSearch, getSearchCriteria, searchState.queries.length]);

  const nextSearch =
    searchState.queries.length > 0 ? searchState.queries.slice(-1)[0] : null;

  return {
    queries: searchState.queries,
    fetchInitialSearch,
    isFetchingInitialSearch: searchState.loading,
    fetchNextSearch,
    isFetchingNextSearch: searchState.loading || nextSearch?.loading
  } as const;
}
