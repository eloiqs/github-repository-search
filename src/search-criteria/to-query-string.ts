import { SearchCriteria } from './search-criteria';

export function toQueryString(criteria: SearchCriteria) {
  const { from, to } = criteria.timeRange;
  const created = `created:${from}..${to}`;

  if (!criteria.languages.length) return created;

  const languages = criteria.languages.reduce((q, lang) => {
    if (!q.length) return `language:${lang}`;
    return q + `+language:${lang}`;
  }, '');

  return `${languages}+${created}`;
}
