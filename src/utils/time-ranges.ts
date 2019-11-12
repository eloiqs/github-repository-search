import moment from 'moment';
import { TimeRangeAbreviation } from '../search-criteria';

export type TimeRange = {
  from: string;
  to: string;
};

export function toTimeRange(timeRange: TimeRangeAbreviation): TimeRange {
  switch (timeRange) {
    case 'yearly':
      return {
        from: moment()
          .subtract(1, 'year')
          .format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD')
      };
    case 'monthly':
      return {
        from: moment()
          .subtract(1, 'month')
          .format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD')
      };
    case 'weekly':
      return {
        from: moment()
          .subtract(1, 'week')
          .format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD')
      };
    case 'daily':
      return {
        from: moment()
          .subtract(1, 'day')
          .format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD')
      };
  }
}
