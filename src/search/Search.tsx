import { Spinner } from 'evergreen-ui';
import React from 'react';
import { Row } from '../layout';
import { Repo } from '../repo';
import { SearchCriteria } from '../search-criteria';
import { useSearchQuery } from '../search-query';

export type SearchProps = {
  criteria: SearchCriteria;
  header?(): JSX.Element | false;
  footer?(): JSX.Element | false;
};

export function Search({ criteria, header, footer }: SearchProps) {
  const [repos, isLoading] = useSearchQuery(criteria);

  return (
    <>
      {header && header()}
      {isLoading ? (
        <Row justifyContent="center">
          <Spinner size={40} />
        </Row>
      ) : (
        <>
          <Row flexWrap="wrap" justifyContent="center">
            {repos.map(repo => (
              <Repo key={repo.html_url} repo={repo} marginX={16} />
            ))}
          </Row>
          {footer && footer()}
        </>
      )}
    </>
  );
}
