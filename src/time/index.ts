import moment from 'moment';
import { capitalize } from '../utils';

export type TimeRangeIncrements = 'year' | 'month' | 'week' | 'day';

export type TimeRangeRecurense = 'yearly' | 'monthly' | 'weekly' | 'daily';

export type TimeRange = {
  increments: TimeRangeIncrements;
  from: string;
  to: string;
};

const RECURENSE_TO_INCREMENTS: Readonly<Record<
  TimeRangeRecurense,
  TimeRangeIncrements
>> = {
  yearly: 'year',
  monthly: 'month',
  weekly: 'week',
  daily: 'day'
};

export function toTimeRangeIncrement(
  timeRangeRecurense: TimeRangeRecurense
): TimeRangeIncrements {
  return RECURENSE_TO_INCREMENTS[timeRangeRecurense];
}

const INCREMENTS_TO_RECURENSE: Readonly<Record<
  TimeRangeIncrements,
  TimeRangeRecurense
>> = {
  year: 'yearly',
  month: 'monthly',
  week: 'weekly',
  day: 'daily'
};

export function toTimeRangeRecurense(
  timeRangeIncrement: TimeRangeIncrements
): TimeRangeRecurense {
  return INCREMENTS_TO_RECURENSE[timeRangeIncrement];
}

const TIME_RANGE_FORMAT = 'YYYY-MM-DD';

export function toTimeRange(
  timeRangeRecurense: TimeRangeRecurense,
  timeRangeOffset = 0
): TimeRange {
  const increments = toTimeRangeIncrement(timeRangeRecurense);

  const from = moment()
    .subtract(1 + timeRangeOffset, increments)
    .format(TIME_RANGE_FORMAT);

  const to = moment(from)
    .add(1, increments)
    .format(TIME_RANGE_FORMAT);

  return {
    increments,
    from,
    to
  };
}

export function createTimeRange(
  increments: TimeRangeIncrements,
  timeRangeOffset = 0
) {
  const recurense = toTimeRangeRecurense(increments);
  return toTimeRange(recurense, timeRangeOffset);
}

export function fromNow(timeRange: TimeRange) {
  return capitalize(moment(timeRange.from).fromNow());
}

const PRETTY_FORMAT = 'MMMM DD, YYYY';

export function prettyFormat(timeRange: TimeRange) {
  const from = moment(timeRange.from).format(PRETTY_FORMAT);
  const to = moment(timeRange.to).format(PRETTY_FORMAT);
  return `${from} – ${to}`;
}
