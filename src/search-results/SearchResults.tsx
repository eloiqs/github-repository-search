import { Spinner } from 'evergreen-ui';
import React from 'react';
import { Repo } from '../repo/Repo';
import useSearchQuery from '../search-query/use-search-query';

export function SearchResults() {
  const [repos, loading] = useSearchQuery();

  return (
    <>
      {!loading ? (
        repos.map(repo => (
          <Repo key={repo.html_url} repo={repo} marginX="16px" />
        ))
      ) : (
        <Spinner delay={500} size={40} />
      )}
    </>
  );
}
