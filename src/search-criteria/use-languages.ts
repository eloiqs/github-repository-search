import jsyaml from 'js-yaml';
import { useEffect, useState } from 'react';
import { useMountedState } from 'react-use';
import createPersistedState from 'use-persisted-state';

const githubLinguistYmlUrl =
  'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';

const usePersistedLanguages = createPersistedState('grs-languages');

export function useLanguages() {
  const isMounted = useMountedState();
  const [isLoading, setIsLoading] = useState(true);
  const [persistedLanguages, setPersistedLanguages] = usePersistedLanguages(
    [] as string[]
  );

  useEffect(() => {
    if (!persistedLanguages.length) {
      setIsLoading(true);
      (async () => {
        const res = await fetch(githubLinguistYmlUrl);
        const yml = await res.text();
        const json = jsyaml.safeLoad(yml);
        if (isMounted()) {
          setPersistedLanguages(Object.keys(json));
          setIsLoading(false);
        }
      })();
    } else {
      setIsLoading(false);
    }
  }, [isMounted, persistedLanguages, setPersistedLanguages]);

  return { languages: persistedLanguages, isLoading };
}
