import { SearchQuery } from './search-query';

export type Search = {
  loading: boolean;
  queries: SearchQuery[];
};

export function createSearch(
  queries = [] as SearchQuery[],
  loading = true
): Search {
  return {
    loading,
    queries
  };
}
