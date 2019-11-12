import { Button, Menu, Popover } from 'evergreen-ui';
import React, { useEffect, useState } from 'react';
import { initialState, useSearchCriteria } from './use-search-criteria';

export function CreatedAt() {
  const [searchCriteria, setSearchCriteria] = useSearchCriteria(initialState);
  const [timeRange, setTimeRange] = useState(
    searchCriteria.timeRangeAbreviation
  );

  useEffect(() => {
    setSearchCriteria(criteria => ({
      ...criteria,
      timeRangeAbreviation: timeRange
    }));
  }, [timeRange, setSearchCriteria]);

  return (
    <Popover
      content={({ close }) => (
        <Menu>
          <Menu.Group>
            <Menu.Item
              onSelect={() => {
                setTimeRange('yearly');
                close();
              }}
            >
              Yearly
            </Menu.Item>
            <Menu.Item
              onSelect={() => {
                setTimeRange('monthly');
                close();
              }}
            >
              Monthly
            </Menu.Item>
            <Menu.Item
              onSelect={() => {
                setTimeRange('weekly');
                close();
              }}
            >
              Weekly
            </Menu.Item>
            <Menu.Item
              onSelect={() => {
                setTimeRange('daily');
                close();
              }}
            >
              Daily
            </Menu.Item>
          </Menu.Group>
        </Menu>
      )}
    >
      <Button iconBefore="calendar">{capitalize(timeRange)}</Button>
    </Popover>
  );
}

function capitalize(_string: string) {
  return _string.charAt(0).toUpperCase() + _string.slice(1);
}
