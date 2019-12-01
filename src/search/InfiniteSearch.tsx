import React, { useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import { RepoCard, RepoCardContent, RepoCardLoader } from '../repo';
import {
  LanguagesSelectMenu,
  TimeRangesPopoverMenu,
  useSearchCriteria
} from '../search-criteria';
import { SearchTypesSelectField, useSearchType } from '../search-type';
import { createTimeRange, fromNow, prettyFormat, TimeRange } from '../time';
import {
  Button,
  Column,
  defaultTheme,
  Heading,
  IconButton,
  Pane,
  Row,
  RowProps,
  Text
} from '../ui';
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
        <SearchQueryLoader />
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

function SearchQueryLoader() {
  return (
    <>
      <SearchQueryHeader>
        <SearchQueryHeaderLoader />
      </SearchQueryHeader>
      <Row
        data-testid="query-repos-loader"
        flexWrap="wrap"
        justifyContent="center"
      >
        {Array.from(Array(12)).map((_, index) => (
          <RepoCard key={index} marginX={16}>
            <RepoCardLoader />
          </RepoCard>
        ))}
      </Row>
    </>
  );
}

function SearchQuery({ query }: { query: Query }) {
  return query.loading ? (
    <SearchQueryLoader />
  ) : (
    <>
      <SearchQueryHeader>
        <SearchQueryHeaderContent timeRange={query.timeRange} />
      </SearchQueryHeader>
      <Row flexWrap="wrap" justifyContent="center">
        {(query.results || []).map(repo => (
          <RepoCard key={repo.url} marginX={16}>
            <RepoCardContent repo={repo} timeRange={query.timeRange} />
          </RepoCard>
        ))}
      </Row>
    </>
  );
}

function SearchQueryHeader({ children, ...props }: RowProps) {
  return (
    <Row paddingX={16} alignItems="center" marginBottom={32} {...props}>
      {children}
    </Row>
  );
}

function SearchQueryHeaderContent({ timeRange }: { timeRange: TimeRange }) {
  return (
    <Column grow>
      <Row>
        <Heading size={600}>{fromNow(timeRange)}</Heading>
      </Row>
      <Row>
        <Text>{prettyFormat(timeRange)}</Text>
      </Row>
    </Column>
  );
}

function SearchQueryHeaderLoader() {
  return (
    <Pane data-testid="query-header-loader" width={264} height={44}>
      <ContentLoader
        height={44}
        width={264}
        speed={1}
        primaryColor="#e8eaef"
        secondaryColor={defaultTheme.colors.background.tint2}
      >
        <rect x="0" y="0" rx="4" ry="4" width="100" height="22" />
        <rect x="0" y="26" rx="4" ry="4" width="264" height="18" />
      </ContentLoader>
    </Pane>
  );
}
