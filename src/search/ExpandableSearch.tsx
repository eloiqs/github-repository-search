import { Button, Heading, Text } from 'evergreen-ui';
import React, { useEffect, useState } from 'react';
import { Column, Row } from '../layout';
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
  toTimeRange,
  toTimeRangeRecurense
} from '../time';

type Search = {
  criteria: SearchCriteria;
};

function createSearch(criteria: SearchCriteria, offset = 0): Search {
  const increments = criteria.timeRange.increments;
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
  const [timeRangeOffset, setTimeRangeOffset] = useState(1);
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
          header={() => (
            <Row paddingX={16} alignItems="center" marginBottom={32}>
              <Column grow>
                <Row>
                  <Heading size={600}>
                    {fromNow(search.criteria.timeRange)}
                  </Heading>
                </Row>
                <Row>
                  <Text>{prettyFormat(search.criteria.timeRange)}</Text>
                </Row>
              </Column>
              {search === searches[0] && (
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
          )}
          footer={() =>
            index === searches.length - 1 && (
              <Row paddingBottom={32} justifyContent="center">
                <Button onClick={loadNext}>
                  Load next {search.criteria.timeRange.increments}
                </Button>
              </Row>
            )
          }
        ></Search>
      ))}
    </>
  );
}
