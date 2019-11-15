import jsyaml from 'js-yaml';
import { useEffect, useState } from 'react';
import createPersistedState from 'use-persisted-state';

const githubLinguistYmlUrl =
  'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';

const usePersistedLanguages = createPersistedState('grs-languages');

export function useLanguages() {
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
        setPersistedLanguages(Object.keys(json));
        setIsLoading(false);
      })();
    } else {
      setIsLoading(false);
    }
  }, [persistedLanguages, setPersistedLanguages]);

  return { languages: persistedLanguages, isLoading };
}
