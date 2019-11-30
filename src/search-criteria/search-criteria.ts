import { SearchReposParams } from '@octokit/rest';
import { TimeRange, toTimeRange } from '../time';

export type SearchCriteria = Omit<SearchReposParams, 'q'> & {
  languages: string[];
  timeRange: TimeRange;
};

export function createSearchCriteria(
  languages: string[] = [],
  timeRange = toTimeRange('yearly')
): SearchCriteria {
  return {
    languages,
    timeRange,
    sort: 'stars',
    order: 'desc',
    page: 0,
    per_page: 20
  };
}
