import { Repo } from '../repo';
import { TimeRange } from '../time';

export type SearchQuery = {
  timeRange: TimeRange;
  loading: boolean;
  results: Repo[] | null;
};

export function createSearchQuery(
  timeRange: TimeRange,
  loading: boolean,
  results: Repo[] | null = null
): SearchQuery {
  return {
    timeRange,
    loading,
    results
  };
}
