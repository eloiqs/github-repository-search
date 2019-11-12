import createPersistedState from 'use-persisted-state';

export const usePersonalAccessToken = createPersistedState(
  'grs-github-personal-access-token'
);
