import React, { useEffect } from 'react';
import { usePersonalAccessToken } from '../personal-access-token';
import { Repo } from '../repo';
import { Languages, TimeRanges, useSearchCriteria } from '../search-criteria';
import { createTimeRange, fromNow, prettyFormat, TimeRange } from '../time';
import { Button, Column, Heading, IconButton, Row, Spinner, Text } from '../ui';
import { SearchQuery as Query } from './search-query';
import { useInfiniteSearch } from './use-infinite-search';

export function InfiniteSearch() {
  const [personalAccessToken] = usePersonalAccessToken('');
  const [searchCriteria, , refreshTimeRange] = useSearchCriteria();
  const [search, load, loadNext] = useInfiniteSearch(
    searchCriteria,
    personalAccessToken
  );

  useEffect(() => {
    load();
  }, [load]);

  function onLoadNext() {
    const timeRange = createTimeRange(
      searchCriteria.timeRange.increments,
      search.queries.length
    );
    loadNext(timeRange);
  }

  return (
    <>
      <SearchHeader refresh={refreshTimeRange} />
      {search.loading ? (
        <Row justifyContent="center">
          <Spinner size={40} data-testid="spinner" />
        </Row>
      ) : (
        <>
          {search.queries.map(query => (
            <SearchQuery key={JSON.stringify(query.timeRange)} query={query} />
          ))}
          {search.queries.every(query => !query.loading) && (
            <Row paddingBottom={32} justifyContent="center">
              <Button onClick={onLoadNext}>
                Load next {searchCriteria.timeRange.increments}
              </Button>
            </Row>
          )}
        </>
      )}
    </>
  );
}

function SearchHeader({ refresh }: { refresh(): void }) {
  return (
    <Row
      paddingX={16}
      alignItems="center"
      marginBottom={32}
      justifyContent="flex-end"
    >
      <Column marginRight={16}>
        <Languages />
      </Column>
      <Column marginRight={16}>
        <TimeRanges />
      </Column>
      <Column>
        <IconButton icon="refresh" onClick={refresh} data-testid="refresh" />
      </Column>
    </Row>
  );
}

function SearchQuery({ query }: { query: Query }) {
  return (
    <Row flexWrap="wrap" justifyContent="center">
      {query.loading ? (
        <Spinner size={40} data-testid="spinner" marginBottom={32} />
      ) : (
        <>
          <SearchQueryHeader timeRange={query.timeRange} />
          {(query.results || []).map(repo => (
            <Repo key={repo.html_url} repo={repo} marginX={16} />
          ))}
        </>
      )}
    </Row>
  );
}

function SearchQueryHeader({ timeRange }: { timeRange: TimeRange }) {
  return (
    <Row paddingX={16} alignItems="center" marginBottom={32}>
      <Column grow>
        <Row>
          <Heading size={600}>{fromNow(timeRange)}</Heading>
        </Row>
        <Row>
          <Text>{prettyFormat(timeRange)}</Text>
        </Row>
      </Column>
    </Row>
  );
}
