import createPersistedState from 'use-persisted-state';
import { createSearchCriteria } from './search-criteria';

export const initialState = createSearchCriteria();

const usePersistedSearchCriteria = createPersistedState('grs-search-criteria');

export function useSearchCriteria() {
  return usePersistedSearchCriteria(initialState);
}
