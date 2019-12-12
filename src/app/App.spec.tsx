import { fetchRepositories } from '@huchenme/github-trending';
import Octokit, { SearchReposResponseItemsItem } from '@octokit/rest';
import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { set as setDate } from 'mockdate';
import moment from 'moment';
import React from 'react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import * as api from '../api';
import { TrendingRepo } from '../api/trending-repos';
import { createSearchCriteria, Language } from '../search-criteria';
import { toTimeRange } from '../time';
import { App } from './App';

let mockMostStarredReposResolve: (
  response: Octokit.Response<Octokit.SearchReposResponse>
) => void;

let mockMostStarredReposRequest = jest.fn(
  () =>
    new Promise(resolve => {
      mockMostStarredReposResolve = resolve;
    })
);

jest.mock('@octokit/rest', () =>
  jest.fn(() => ({
    search: {
      repos: mockMostStarredReposRequest
    }
  }))
);

function createMostStarredReposResponse(
  items: Partial<SearchReposResponseItemsItem>[]
) {
  return {
    data: { items: items.map(item => ({ ...item, owner: {} })) }
  } as Octokit.Response<Octokit.SearchReposResponse>;
}

let mockTrendingReposResolve: ((response: TrendingRepo[]) => void)[] = [];
const mockTrendingReposRequest: jest.Mocked<typeof fetchRepositories> = fetchRepositories;

jest.mock('@huchenme/github-trending', () => ({
  fetchRepositories: jest.fn(
    () =>
      new Promise(resolve => {
        mockTrendingReposResolve.push(resolve);
      })
  )
}));

const fetchLanguages = api.fetchLanguages as jest.Mock;
let mockFetchLanguagesResolve: (languages: Partial<Language>[]) => void;

jest.mock('../api/fetch-languages', () => ({
  fetchLanguages: jest.fn(
    () =>
      new Promise(resolve => {
        mockFetchLanguagesResolve = resolve;
      })
  )
}));

test('searches repos with the default criteria', async () => {
  const { getByText, getAllByLabelText } = render(<App />);

  expect(getByText('Filter languages')).toBeVisible();
  expect(getByText('Yearly')).toBeVisible();
  expect(getAllByLabelText('Repo loading...').length).toBe(12);
  expect(mockMostStarredReposRequest).toBeCalledWith({
    q: 'created:2018-11-27..2019-11-27',
    sort: 'stars'
  });

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'repo_url', name: 'some repo' }
      ])
    );
  });

  expect(getAllByLabelText('Repo loading...').length).toBe(3);
  expect(getByText('A year ago')).toBeVisible();
  expect(getByText('November 27, 2018 – November 27, 2019')).toBeVisible();
  expect(getByText('some repo')).toBeVisible();
});

test('searches repos with the localStorage criteria', async () => {
  localStorage.setItem(
    'grs-search-criteria',
    JSON.stringify(
      createSearchCriteria(['JavaScript', 'TypeScript'], toTimeRange('weekly'))
    )
  );

  const { getByText, getAllByLabelText } = render(<App />);

  expect(getByText('JavaScript, TypeScript')).toBeVisible();
  expect(getByText('Weekly')).toBeVisible();
  expect(getAllByLabelText('Repo loading...').length).toBe(12);
  expect(mockMostStarredReposRequest).toBeCalledWith({
    q: 'language:JavaScript+language:TypeScript+created:2019-11-20..2019-11-27',
    sort: 'stars'
  });
  expect(JSON.parse(localStorage.getItem('grs-search-criteria'))).toEqual({
    languages: ['JavaScript', 'TypeScript'],
    timeRange: {
      increments: 'week',
      from: '2019-11-20',
      to: '2019-11-27'
    },
    order: 'desc',
    page: 0,
    per_page: 20
  });

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'repo_url', name: 'some repo' }
      ])
    );
  });

  expect(getAllByLabelText('Repo loading...').length).toBe(3);
  expect(getByText('8 days ago')).toBeVisible();
  expect(getByText('November 20, 2019 – November 27, 2019')).toBeVisible();
  expect(getByText('some repo')).toBeVisible();
});

test('allows loading the next increment of results', async () => {
  const { getByText, getAllByLabelText, queryByText } = render(<App />);

  mockMostStarredReposRequest.mockClear();

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'repo_url', name: 'some repo' }
      ])
    );
  });

  expect(getAllByLabelText('Repo loading...').length).toBe(3);

  act(() => {
    mockAllIsIntersecting(true);
  });

  expect(getAllByLabelText('Repo loading...').length).toBe(12);
  expect(getByText('some repo')).toBeVisible();
  expect(queryByText('Load next year')).toBeNull();
  expect(mockMostStarredReposRequest).toBeCalledWith({
    q: 'created:2017-11-27..2018-11-27',
    sort: 'stars'
  });

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'other_repo_url', name: 'some other repo' }
      ])
    );
  });

  expect(getAllByLabelText('Repo loading...').length).toBe(3);
  expect(getByText('2 years ago')).toBeVisible();
  expect(getByText('November 27, 2017 – November 27, 2018')).toBeVisible();
  expect(getByText('some other repo')).toBeVisible();
});

test('searches repos when the language changes', async () => {
  localStorage.setItem(
    'grs-languages',
    JSON.stringify({
      languages: [{ name: 'JavaScript' }, { name: 'TypeScript' }]
    })
  );

  const {
    getByText,
    queryByText,
    getByPlaceholderText,
    getByRole,
    getAllByLabelText
  } = render(<App />);

  mockMostStarredReposRequest.mockClear();

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'repo_url', name: 'some repo' }
      ])
    );
  });

  act(() => {
    mockAllIsIntersecting(true);
  });

  expect(mockMostStarredReposRequest).toHaveBeenCalled();

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'other_repo_url', name: 'some other repo' }
      ])
    );
  });

  expect(getAllByLabelText('Repo loading...').length).toBe(3);
  expect(getByText('2 years ago')).toBeVisible();

  fireEvent.click(getByText('Filter languages'));

  expect(getByRole('dialog')).toBeVisible();
  expect(getByText('JavaScript')).toBeVisible();
  expect(getByText('TypeScript')).toBeVisible();

  userEvent.type(getByPlaceholderText('Filter...'), 'TypeScript');

  expect(queryByText('JavaScript')).toBeNull();
  expect(getByRole('dialog')).toBeVisible();
  expect(getByText('TypeScript')).toBeVisible();

  fireEvent.click(getByText('TypeScript'));

  expect(getAllByLabelText('Repo loading...').length).toBe(12);
  expect(queryByText('Load next year')).toBeNull();
  expect(queryByText('2 years ago')).toBeNull();
  expect(mockMostStarredReposRequest).toBeCalledWith({
    q: 'language:TypeScript+created:2018-11-27..2019-11-27',
    sort: 'stars'
  });

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'repo_url', name: 'some repo' }
      ])
    );
  });

  expect(getAllByLabelText('Repo loading...').length).toBe(3);
  expect(getByText('A year ago')).toBeVisible();
  expect(getByText('November 27, 2018 – November 27, 2019')).toBeVisible();
  expect(getByText('some repo')).toBeVisible();
});

test('searches repos when the time increment changes', async () => {
  const { getAllByLabelText, getByText, getByRole, queryByText } = render(
    <App />
  );

  mockMostStarredReposRequest.mockClear();

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'repo_url', name: 'some repo' }
      ])
    );
  });

  act(() => {
    mockAllIsIntersecting(true);
  });

  expect(mockMostStarredReposRequest).toBeCalled();

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'other_repo_url', name: 'some other repo' }
      ])
    );
  });

  expect(getAllByLabelText('Repo loading...').length).toBe(3);
  expect(getByText('2 years ago')).toBeVisible();

  fireEvent.click(getByText('Yearly'));

  expect(getByRole('menu')).toBeVisible();
  expect(getByText('Monthly')).toBeVisible();
  expect(getByText('Weekly')).toBeVisible();
  expect(getByText('Daily')).toBeVisible();

  fireEvent.click(getByText('Weekly'));

  expect(getAllByLabelText('Repo loading...').length).toBe(12);
  expect(queryByText('Load next week')).toBeNull();
  expect(queryByText('2 years ago')).toBeNull();
  expect(mockMostStarredReposRequest).toBeCalledWith({
    q: 'created:2019-11-20..2019-11-27',
    sort: 'stars'
  });

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'repo_url', name: 'some repo' }
      ])
    );
  });

  expect(getAllByLabelText('Repo loading...').length).toBe(3);
  expect(getByText('8 days ago')).toBeVisible();
  expect(getByText('November 20, 2019 – November 27, 2019')).toBeVisible();
  expect(getByText('some repo')).toBeVisible();
});

test('allows refreshing the search with an updated time range', async () => {
  const { getByText, getByLabelText, getAllByLabelText, queryByText } = render(
    <App />
  );

  mockMostStarredReposRequest.mockClear();

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'repo_url', name: 'some repo' }
      ])
    );
  });

  expect(getByText('some repo')).toBeVisible();

  act(() => {
    mockAllIsIntersecting(true);
  });

  expect(mockMostStarredReposRequest).toBeCalled();

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'other_repo_url', name: 'some other repo' }
      ])
    );
  });

  expect(getByText('some other repo')).toBeVisible();
  expect(getAllByLabelText('Repo loading...').length).toBe(3);

  setDate('2019-11-29');
  fireEvent.click(getByLabelText('refresh'));

  expect(getAllByLabelText('Repo loading...').length).toBe(12);
  expect(queryByText('2 years ago')).toBeNull();
  expect(mockMostStarredReposRequest).toBeCalledWith({
    q: 'created:2018-11-28..2019-11-28',
    sort: 'stars'
  });

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'repo_url', name: 'some repo' }
      ])
    );
  });

  expect(getAllByLabelText('Repo loading...').length).toBe(3);
  expect(getByText('A year ago')).toBeVisible();
  expect(getByText('November 28, 2018 – November 28, 2019')).toBeVisible();
  expect(getByText('some repo')).toBeVisible();
});

test('allows searching for trending repos', async () => {
  localStorage.setItem(
    'grs-languages',
    JSON.stringify({
      languages: [{ name: 'JavaScript' }, { name: 'TypeScript' }]
    })
  );

  localStorage.setItem(
    'grs-search-criteria',
    JSON.stringify(
      createSearchCriteria(['JavaScript', 'TypeScript'], toTimeRange('daily'))
    )
  );

  const { getByText, getByLabelText } = render(<App />);

  await act(async () => {
    mockMostStarredReposResolve(
      createMostStarredReposResponse([
        { html_url: 'repo_url', name: 'some repo' }
      ])
    );
  });

  expect((getByText('Most starred') as HTMLOptionElement).selected).toBe(true);

  await act(async () => {
    userEvent.selectOptions(getByLabelText('Search type'), 'trending');
  });

  expect((getByText('Trending') as HTMLOptionElement).selected).toBe(true);
  expect(mockTrendingReposRequest).toBeCalledWith({
    since: 'daily',
    language: 'TypeScript'
  });
  expect(mockTrendingReposRequest).toBeCalledWith({
    since: 'daily',
    language: 'JavaScript'
  });

  await act(async () => {
    mockTrendingReposResolve.pop()([
      { name: 'some repo', url: 'repo_url' } as TrendingRepo
    ]);
    mockTrendingReposResolve.pop()([
      { name: 'some other repo', url: 'other_repo_url' } as TrendingRepo
    ]);
  });

  expect(getByText('some repo')).toBeVisible();
  expect(getByText('some other repo')).toBeVisible();

  mockTrendingReposRequest.mockClear();

  act(() => {
    mockAllIsIntersecting(true);
  });

  expect(mockTrendingReposRequest).not.toBeCalled();
});

test('gets the latest languages data from github once per day', async () => {
  fetchLanguages.mockClear();

  setDate('2019-12-01');
  localStorage.setItem(
    'grs-languages',
    JSON.stringify({
      timestamp: moment().format(),
      languages: [{ name: 'JavaScript' }]
    })
  );

  const queries = render(<App />);

  expect(fetchLanguages).not.toBeCalled();

  setDate('2019-11-30');
  localStorage.setItem(
    'grs-languages',
    JSON.stringify({
      timestamp: moment().format(),
      languages: [{ name: 'JavaScript' }]
    })
  );

  setDate('2019-12-01');
  queries.unmount();
  queries.rerender(<App />);

  expect(fetchLanguages).toBeCalledWith();

  fireEvent.click(queries.getByText('Filter languages'));

  expect(queries.getByRole('dialog')).toBeVisible();
  expect(queries.getByText('JavaScript')).toBeVisible();
  expect(queries.queryByText('TypeScript')).toBeNull();

  await act(async () => {
    mockFetchLanguagesResolve([{ name: 'JavaScript' }, { name: 'TypeScript' }]);
  });

  expect(queries.getByRole('dialog')).toBeVisible();
  expect(queries.getByText('JavaScript')).toBeVisible();
  expect(queries.getByText('TypeScript')).toBeVisible();
});
