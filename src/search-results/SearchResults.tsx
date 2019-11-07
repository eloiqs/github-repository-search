import React from 'react';
import { Spinner } from 'evergreen-ui';
import { Row } from '../layout/Row';
import { Repo } from '../repo/Repo';
import useSearchQuery from '../search-query/use-search-query';

export function SearchResults() {
  const repos = useSearchQuery();

  return (
    <Row
      flexWrap="wrap"
      justifyContent="center"
      marginTop="16px"
      paddingLeft="8px"
      paddingRight="8px"
    >
      {repos.length ? (
        repos.map(repo => <Repo key={repo.id} repo={repo} />)
      ) : (
        <Row justifyContent="center">
          <Spinner delay={500} size={40} />
        </Row>
      )}
    </Row>
  );
}
