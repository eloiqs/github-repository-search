import Octokit from '@octokit/rest';
import { Repo } from '../repo';
import { SearchCriteria, toQueryString } from '../search-criteria';

export async function fetchMostStarredRepos(
  searchCriteria: SearchCriteria,
  personalAccessToken: string
): Promise<Repo[]> {
  const response = await new Octokit({
    auth: personalAccessToken
  }).search.repos({
    q: toQueryString(searchCriteria),
    sort: 'stars'
  });

  return response.data.items.map(item => ({
    name: item.name,
    url: item.html_url,
    owner: {
      name: item.owner.login,
      url: (item.owner as any).html_url,
      avatarUrl: item.owner.avatar_url
    },
    createdAt: item.created_at,
    description: item.description,
    language: item.language,
    stars: item.stargazers_count,
    forks: item.forks_count
  }));
}
