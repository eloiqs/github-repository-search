import { SearchReposParams } from '@octokit/rest';
import { TimeRange, toTimeRange } from '../time';

export type SearchCriteria = Omit<SearchReposParams, 'q' | 'star'> & {
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
    order: 'desc',
    page: 0,
    per_page: 20
  };
}
