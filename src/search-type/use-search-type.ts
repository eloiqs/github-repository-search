import createPersistedState from 'use-persisted-state';

export type SearchTypes = 'most-starred' | 'trending';

const usePersistedSearchType = createPersistedState('grs-search-type');

const initialState: SearchTypes = 'most-starred';

export function useSearchType() {
  const [persistedSearchType, setPersistedSearchType] = usePersistedSearchType(
    initialState
  );

  return {
    searchType: persistedSearchType,
    setSearchType: setPersistedSearchType
  } as const;
}
