import React, { useEffect, useState } from 'react';
import { Search } from '.';
import {
  CreatedAt,
  Languages,
  SearchCriteria,
  useSearchCriteria
} from '../search-criteria';
import {
  fromNow,
  prettyFormat,
  TimeRange,
  TimeRangeIncrements,
  toTimeRange,
  toTimeRangeRecurense
} from '../time';
import { Button, Column, Heading, Row, Text } from '../ui';

type Search = {
  criteria: SearchCriteria;
};

function createSearch(criteria: SearchCriteria, offset = 0): Search {
  const { increments } = criteria.timeRange;
  const recurense = toTimeRangeRecurense(increments);
  const timeRange = toTimeRange(recurense, offset);

  return {
    criteria: {
      ...criteria,
      timeRange
    }
  };
}

export function ExpandableSearch() {
  const [searchCriteria] = useSearchCriteria();
  const [timeRangeOffset, setTimeRangeOffset] = useState(0);
  const [searches, setSearches] = useState([createSearch(searchCriteria)]);

  useEffect(() => {
    setSearches(() => [createSearch(searchCriteria)]);
  }, [searchCriteria]);

  function loadNext() {
    const offset = timeRangeOffset + 1;
    setTimeRangeOffset(offset);
    setSearches(searches => {
      const search = createSearch(searchCriteria, offset);
      return [...searches, search];
    });
  }

  return (
    <>
      {searches.map((search, index) => (
        <Search
          key={JSON.stringify(search)}
          criteria={search.criteria}
          header={
            <SearchHeader
              timeRange={search.criteria.timeRange}
              showFilters={index === 0}
            />
          }
          footer={
            <SearchFooter
              increments={search.criteria.timeRange.increments}
              loadNext={index === searches.length - 1 && loadNext}
            />
          }
        ></Search>
      ))}
    </>
  );
}

type SearchHeaderProps = {
  timeRange: TimeRange;
  showFilters: boolean;
};

function SearchHeader({ timeRange, showFilters }: SearchHeaderProps) {
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
      {showFilters && (
        <>
          <Column marginRight={16}>
            <Languages />
          </Column>
          <Column>
            <CreatedAt />
          </Column>
        </>
      )}
    </Row>
  );
}

type SearchFooterProps = {
  loadNext?: (() => void) | false;
  increments: TimeRangeIncrements;
};

function SearchFooter({ loadNext, increments }: SearchFooterProps) {
  return (
    <Row paddingBottom={32} justifyContent="center">
      {loadNext && <Button onClick={loadNext}>Load next {increments}</Button>}
    </Row>
  );
}
