import { SearchQuery } from './search-query';

export type Search = {
  loading: boolean;
  queries: SearchQuery[];
};

export function createSearch(queries: SearchQuery[], loading: boolean): Search {
  return {
    queries,
    loading
  };
}
