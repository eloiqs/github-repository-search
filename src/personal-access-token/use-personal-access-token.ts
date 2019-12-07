import createPersistedState from 'use-persisted-state';

const usePersistedPersonalAccessToken = createPersistedState(
  'grs-github-personal-access-token'
);

const initialState = '';

export function usePersonalAccessToken() {
  const [
    persistedPersonalAccessToken,
    setPersistedPersonalAccessToken
  ] = usePersistedPersonalAccessToken(initialState);

  return [
    persistedPersonalAccessToken,
    setPersistedPersonalAccessToken
  ] as const;
}
