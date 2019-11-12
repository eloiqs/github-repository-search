import { Heading, Text } from 'evergreen-ui';
import moment from 'moment';
import React from 'react';
import { Column, Row } from '../layout';
import { PersonalAccessToken } from '../personal-access-token';
import {
  CreatedAt,
  initialState,
  Languages,
  TimeRangeAbreviation,
  useSearchCriteria
} from '../search-criteria';
import { SearchResults } from '../search-results';
import { toTimeRange } from '../utils';

export function Main() {
  const [criteria] = useSearchCriteria(initialState);

  return (
    <Column width="100%">
      <Row
        marginBottom="32px"
        background="orangeTint"
        paddingY="8px"
        justifyContent="center"
      >
        <PersonalAccessToken />
      </Row>
      <Row>
        <Column width="1032px" margin="auto">
          <Row
            marginBottom="32px"
            paddingX="16px"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Column grow>
              <Row>
                <Heading size={600}>
                  {getTimeRangeTitle(criteria.timeRangeAbreviation)}
                </Heading>
              </Row>
              <Row>
                <Text>
                  {getTimeRangeDescription(criteria.timeRangeAbreviation)}
                </Text>
              </Row>
            </Column>
            <Column marginRight="16px">
              <Languages />
            </Column>
            <Column>
              <CreatedAt />
            </Column>
          </Row>
          <Row flexWrap="wrap" justifyContent="center">
            <SearchResults />
          </Row>
        </Column>
      </Row>
    </Column>
  );
}

function getTimeRangeTitle(timeRange: TimeRangeAbreviation) {
  switch (timeRange) {
    case 'yearly':
      return 'Last year';
    case 'monthly':
      return 'Last month';
    case 'weekly':
      return 'Last week';
    case 'daily':
      return 'Yesterday';
  }
}

function getTimeRangeDescription(timeRangeAbreviation: TimeRangeAbreviation) {
  const timeRange = toTimeRange(timeRangeAbreviation);
  const from = moment(timeRange.from).format('MMMM DD, YYYY');
  const to = moment(timeRange.to).format('MMMM DD, YYYY');
  return `${from} – ${to}`;
}
