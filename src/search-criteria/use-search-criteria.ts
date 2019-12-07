import { useCallback } from 'react';
import createPersistedState from 'use-persisted-state';
import { createTimeRange } from '../time';
import { createSearchCriteria } from './search-criteria';

export const initialState = createSearchCriteria();

const usePersistedSearchCriteria = createPersistedState('grs-search-criteria');

export function useSearchCriteria() {
  const [searchCriteria, setSearchCriteria] = usePersistedSearchCriteria(
    initialState
  );

  const refreshTimeRange = useCallback(() => {
    setSearchCriteria(criteria =>
      createSearchCriteria(
        criteria.languages,
        createTimeRange(criteria.timeRange.increments)
      )
    );
  }, [setSearchCriteria]);

  return { searchCriteria, setSearchCriteria, refreshTimeRange } as const;
}
