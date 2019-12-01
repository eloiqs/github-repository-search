import moment from 'moment';
import { useEffect, useState } from 'react';
import { useMountedState } from 'react-use';
import createPersistedState from 'use-persisted-state';
import { fetchLanguages } from '../api';

const usePersistedLanguages = createPersistedState('grs-languages');

export type Language = {
  name: string;
  color: string;
};

const initialState = {
  languages: [] as Language[],
  timestamp: null as string | null
};

export function useLanguages() {
  const isMounted = useMountedState();
  const [isLoading, setIsLoading] = useState(true);
  const [
    { languages: persistedLanguages, timestamp },
    setPersistedLanguages
  ] = usePersistedLanguages(initialState);

  useEffect(() => {
    if (!timestamp || moment().diff(moment(timestamp), 'days') > 0) {
      (async () => {
        setIsLoading(true);

        const languages = await fetchLanguages();

        if (isMounted()) {
          if (
            JSON.stringify(languages) !== JSON.stringify(persistedLanguages)
          ) {
            setPersistedLanguages({ languages, timestamp: moment().format() });
          }
          setIsLoading(false);
        }
      })();
    }
  }, [isMounted, persistedLanguages, setPersistedLanguages, timestamp]);

  return [persistedLanguages, isLoading] as [
    typeof persistedLanguages,
    typeof isLoading
  ];
}
