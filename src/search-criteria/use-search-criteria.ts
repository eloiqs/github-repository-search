import { useCallback } from 'react';
import createPersistedState from 'use-persisted-state';
import { createTimeRange } from '../time';
import { createSearchCriteria, SearchCriteria } from './search-criteria';

export const initialSearchCriteriaState = createSearchCriteria();

const usePersistedSearchCriteria = createPersistedState('grs-search-criteria');

export function useSearchCriteria() {
  const [
    persistedSearchCriteria,
    setPersistedSearchCriteria
  ] = usePersistedSearchCriteria(initialSearchCriteriaState);

  const getSearchCriteria = useCallback(() => {
    return getRefreshedSearchCriteria(persistedSearchCriteria);
  }, [persistedSearchCriteria]);

  const refreshTimeRange = useCallback(() => {
    setPersistedSearchCriteria(criteria =>
      getRefreshedSearchCriteria(criteria)
    );
  }, [setPersistedSearchCriteria]);

  return {
    getSearchCriteria,
    setSearchCriteria: setPersistedSearchCriteria,
    refreshTimeRange
  } as const;
}

function getRefreshedSearchCriteria(criteria: SearchCriteria) {
  return createSearchCriteria(
    criteria.languages,
    createTimeRange(criteria.timeRange.increments)
  );
}
