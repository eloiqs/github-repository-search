import Octokit from '@octokit/rest';
import { SearchCriteria, toQueryString } from '../search-criteria';

export function searchRepos(
  personalAccessToken: string,
  searchCriteria: SearchCriteria
) {
  return new Octokit({ auth: personalAccessToken }).search.repos({
    q: toQueryString(searchCriteria),
    sort: searchCriteria.sort
  });
}
