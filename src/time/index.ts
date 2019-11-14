import moment from 'moment';
import { capitalize } from '../capitalize';

export type TimeRangeIncrements = 'year' | 'month' | 'week' | 'day';

export type TimeRangeRecurense = 'yearly' | 'monthly' | 'weekly' | 'daily';

export type TimeRange = {
  increments: TimeRangeIncrements;
  from: string;
  to: string;
};

export function toTimeRangeIncrement(
  timeRangeRecurense: TimeRangeRecurense
): TimeRangeIncrements {
  switch (timeRangeRecurense) {
    case 'yearly':
      return 'year';
    case 'monthly':
      return 'month';
    case 'weekly':
      return 'week';
    case 'daily':
      return 'day';
  }
}

export function toTimeRangeRecurense(
  timeRangeIncrement: TimeRangeIncrements
): TimeRangeRecurense {
  switch (timeRangeIncrement) {
    case 'year':
      return 'yearly';
    case 'month':
      return 'monthly';
    case 'week':
      return 'weekly';
    case 'day':
      return 'daily';
  }
}

export function toTimeRange(
  timeRangeRecurense: TimeRangeRecurense,
  timeRangeOffset = 0
): TimeRange {
  const increments = toTimeRangeIncrement(timeRangeRecurense);

  const from = moment()
    .subtract(1 + timeRangeOffset, increments)
    .format('YYYY-MM-DD');

  const to = moment(from)
    .add(1 + timeRangeOffset, increments)
    .format('YYYY-MM-DD');

  return {
    increments,
    from,
    to
  };
}

export function fromNow(timeRange: TimeRange) {
  return capitalize(moment(timeRange.from).fromNow());
}

export function prettyFormat(timeRange: TimeRange) {
  const from = moment(timeRange.from).format('MMMM DD, YYYY');
  const to = moment(timeRange.to).format('MMMM DD, YYYY');
  return `${from} – ${to}`;
}
