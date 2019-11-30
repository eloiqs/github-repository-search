import { SearchReposResponseItemsItem } from '@octokit/rest';
import { TimeRange } from '../time';

export type SearchQuery = {
  timeRange: TimeRange;
  loading: boolean;
  results: SearchReposResponseItemsItem[] | null;
};

export function createSearchQuery(
  timeRange: TimeRange,
  results: SearchReposResponseItemsItem[] | null = null,
  loading = true
): SearchQuery {
  return {
    timeRange,
    loading,
    results
  };
}
