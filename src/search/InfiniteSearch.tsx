import React, { useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import { useInView } from 'react-intersection-observer';
import { RepoCard, RepoCardContent, RepoCardLoader } from '../repo';
import {
  LanguagesSelectMenu,
  TimeRangesPopoverMenu,
  useSearchCriteria
} from '../search-criteria';
import { SearchTypesSelectField, useSearchType } from '../search-type';
import { fromNow, prettyFormat, TimeRange } from '../time';
import {
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
  const { searchType } = useSearchType();
  const { refreshTimeRange } = useSearchCriteria();
  const {
    queries,
    fetchInitialSearch,
    isFetchingInitialSearch,
    fetchNextSearch,
    isFetchingNextSearch
  } = useInfiniteSearch();

  useEffect(() => {
    fetchInitialSearch();
  }, [fetchInitialSearch]);

  const showFooter =
    searchType === 'most-starred' &&
    !isFetchingInitialSearch &&
    !isFetchingNextSearch &&
    queries.some(query => query.results && query.results.length);

  return (
    <Column width={1032} margin="auto">
      <SearchHeader refresh={refreshTimeRange} />
      {isFetchingInitialSearch ? (
        <SearchQueryLoader repoCount={12} />
      ) : (
        <>
          {queries.map((query, index) => (
            <SearchQuery
              key={JSON.stringify(query.timeRange)}
              index={index}
              query={query}
            />
          ))}
        </>
      )}
      {showFooter && <SearchQueryFooter onVisible={fetchNextSearch} />}
    </Column>
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
        <IconButton icon="refresh" onClick={refresh} aria-label="refresh" />
      </Column>
    </Row>
  );
}

function SearchQueryFooter({ onVisible }: { onVisible: () => any }) {
  const [ref, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      onVisible();
    }
  }, [inView, onVisible]);

  return (
    <div ref={ref}>
      <SearchQueryLoader repoCount={3} />
    </div>
  );
}

function SearchQueryLoader({ repoCount }: { repoCount: number }) {
  return (
    <>
      <SearchQueryHeader>
        <SearchQueryHeaderLoader />
      </SearchQueryHeader>
      <Row flexWrap="wrap" justifyContent="center">
        {Array.from(Array(repoCount)).map((_, index) => (
          <RepoCard key={index} marginX={16}>
            <RepoCardLoader />
          </RepoCard>
        ))}
      </Row>
    </>
  );
}

function SearchQuery({ query, index }: { query: Query; index: number }) {
  return query.loading ? (
    <SearchQueryLoader repoCount={12} />
  ) : (
    <div data-testid={`query-${index}`}>
      <SearchQueryHeader>
        <SearchQueryHeaderContent timeRange={query.timeRange} />
      </SearchQueryHeader>
      <Row flexWrap="wrap" justifyContent="center">
        {query.results?.map(repo => (
          <RepoCard key={repo.url} marginX={16}>
            <RepoCardContent repo={repo} timeRange={query.timeRange} />
          </RepoCard>
        ))}
      </Row>
    </div>
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
    <Pane width={264} height={44}>
      <ContentLoader
        height={44}
        width={264}
        speed={1}
        primaryColor="#e8eaef"
        secondaryColor={defaultTheme.colors.background.tint2}
        ariaLabel="Search query header loading..."
      >
        <rect x="0" y="0" rx="4" ry="4" width="100" height="22" />
        <rect x="0" y="26" rx="4" ry="4" width="264" height="18" />
      </ContentLoader>
    </Pane>
  );
}
