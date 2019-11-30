import React, { useEffect } from 'react';
import { RepoCard } from '../repo';
import {
  LanguagesSelectMenu,
  TimeRangesPopoverMenu,
  useSearchCriteria
} from '../search-criteria';
import { SearchTypesSelectField, useSearchType } from '../search-type';
import { createTimeRange, fromNow, prettyFormat, TimeRange } from '../time';
import { Button, Column, Heading, IconButton, Row, Spinner, Text } from '../ui';
import { SearchQuery as Query } from './search-query';
import { useInfiniteSearch } from './use-infinite-search';

export function InfiniteSearch() {
  const [searchType] = useSearchType();
  const [searchCriteria, , refreshTimeRange] = useSearchCriteria();
  const [search, load, loadNext] = useInfiniteSearch();

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
          {searchType === 'most-starred' &&
            search.queries.every(query => !query.loading) && (
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
    <Row paddingX={16} alignItems="center" marginBottom={32}>
      <Column grow>
        <SearchTypesSelectField />
      </Column>
      <Column marginRight={16}>
        <LanguagesSelectMenu />
      </Column>
      <Column marginRight={16}>
        <TimeRangesPopoverMenu />
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
            <RepoCard
              key={repo.url}
              repo={repo}
              timeRange={query.timeRange}
              marginX={16}
            />
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
