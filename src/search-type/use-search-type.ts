import createPersistedState from 'use-persisted-state';

export type SearchTypes = 'most-starred' | 'trending';

const usePersistedSearchType = createPersistedState('grs-search-type');

export const initialSearchTypeState: SearchTypes = 'most-starred';

export function useSearchType() {
  const [persistedSearchType, setPersistedSearchType] = usePersistedSearchType(
    initialSearchTypeState
  );

  return {
    searchType: persistedSearchType,
    setSearchType: setPersistedSearchType
  } as const;
}
