import React, { useEffect, useState } from 'react';
import { useSearchType } from '../search-type';
import { TimeRangeRecurense, toTimeRange, toTimeRangeRecurense } from '../time';
import { Button, Menu, Popover } from '../ui';
import { capitalize } from '../utils';
import { createSearchCriteria } from './search-criteria';
import { useSearchCriteria } from './use-search-criteria';

export function TimeRangesPopoverMenu() {
  const { searchType } = useSearchType();
  const { getSearchCriteria, setSearchCriteria } = useSearchCriteria();
  const [timeRangeRecurense, setTimeRangeRecurense] = useState(
    toTimeRangeRecurense(getSearchCriteria().timeRange.increments)
  );

  useEffect(() => {
    if (searchType === 'trending' && timeRangeRecurense === 'yearly') {
      setTimeRangeRecurense('monthly');
      setSearchCriteria(criteria =>
        createSearchCriteria(criteria.languages, toTimeRange('monthly'))
      );
    }
  }, [searchType, setSearchCriteria, timeRangeRecurense]);

  function onSelect(timeRangeRecurense: TimeRangeRecurense, close: () => void) {
    return function() {
      setTimeRangeRecurense(timeRangeRecurense);
      setSearchCriteria(criteria =>
        createSearchCriteria(
          criteria.languages,
          toTimeRange(timeRangeRecurense)
        )
      );
      close();
    };
  }

  return (
    <Popover
      content={({ close }) => (
        <Menu>
          <Menu.Group>
            {searchType !== 'trending' && (
              <Menu.Item onSelect={onSelect('yearly', close)}>Yearly</Menu.Item>
            )}
            <Menu.Item onSelect={onSelect('monthly', close)}>Monthly</Menu.Item>
            <Menu.Item onSelect={onSelect('weekly', close)}>Weekly</Menu.Item>
            <Menu.Item onSelect={onSelect('daily', close)}>Daily</Menu.Item>
          </Menu.Group>
        </Menu>
      )}
    >
      <Button iconBefore="calendar" data-testid="time-range-filter">
        {capitalize(timeRangeRecurense)}
      </Button>
    </Popover>
  );
}
