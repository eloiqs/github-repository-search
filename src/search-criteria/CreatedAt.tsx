import React, { useState } from 'react';
import { capitalize } from '../capitalize';
import { TimeRangeRecurense, toTimeRange, toTimeRangeRecurense } from '../time';
import { Button, Menu, Popover } from '../ui';
import { useSearchCriteria } from './use-search-criteria';

export function CreatedAt() {
  const [searchCriteria, setSearchCriteria] = useSearchCriteria();
  const [timeRangeRecurense, setTimeRangeRecurense] = useState(
    toTimeRangeRecurense(searchCriteria.timeRange.increments)
  );

  function onSelect(timeRangeRecurense: TimeRangeRecurense, close: () => void) {
    return function() {
      setTimeRangeRecurense(timeRangeRecurense);
      setSearchCriteria(criteria => ({
        ...criteria,
        timeRange: toTimeRange(timeRangeRecurense)
      }));
      close();
    };
  }

  return (
    <Popover
      content={({ close }) => (
        <Menu>
          <Menu.Group>
            <Menu.Item onSelect={onSelect('yearly', close)}>Yearly</Menu.Item>
            <Menu.Item onSelect={onSelect('monthly', close)}>Monthly</Menu.Item>
            <Menu.Item onSelect={onSelect('weekly', close)}>Weekly</Menu.Item>
            <Menu.Item onSelect={onSelect('daily', close)}>Daily</Menu.Item>
          </Menu.Group>
        </Menu>
      )}
    >
      <Button iconBefore="calendar">{capitalize(timeRangeRecurense)}</Button>
    </Popover>
  );
}
