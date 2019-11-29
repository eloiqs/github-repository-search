import Octokit, { SearchReposResponseItemsItem } from '@octokit/rest';
import '@testing-library/jest-dom/extend-expect';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { App } from './App';
import { toTimeRange } from '../time';
import userEvent from '@testing-library/user-event';

jest.mock('@octokit/rest');

let mockSearchRepos: jest.Mock;

let mockResolveRepos: (
  response: Octokit.Response<Octokit.SearchReposResponse>
) => void;

jest.mock('@octokit/rest', () => {
  return jest.fn(() => {
    mockSearchRepos = jest.fn(
      () =>
        new Promise(resolve => {
          mockResolveRepos = resolve;
        })
    );
    return {
      search: {
        repos: mockSearchRepos
      }
    };
  });
});

function createSearchReposResponse(
  items: Partial<SearchReposResponseItemsItem>[]
) {
  return {
    data: { items: items.map(item => ({ ...item, owner: {} })) }
  } as Octokit.Response<Octokit.SearchReposResponse>;
}

afterEach(() => {
  localStorage.clear();
});

test('searches repos with the default criteria', async () => {
  jest
    .spyOn(Date, 'now')
    .mockImplementation(() => new Date('2019-11-28').valueOf());

  const { getByTestId, getByText, queryByText, queryByTestId } = render(
    <App />
  );

  expect(getByText('Filter languages')).toBeVisible();
  expect(getByText('Yearly')).toBeVisible();
  expect(getByText('A year ago')).toBeVisible();
  expect(getByText('November 27, 2018 – November 27, 2019')).toBeVisible();
  expect(getByTestId('spinner')).toBeVisible();
  expect(queryByText('Load next year')).toBeNull();
  expect(mockSearchRepos).toBeCalledWith({
    q: 'created:2018-11-27..2019-11-27',
    sort: 'stars'
  });

  await act(async () => {
    mockResolveRepos(
      createSearchReposResponse([{ html_url: 'repo_url', name: 'some repo' }])
    );
  });

  expect(queryByTestId('spinner')).toBeNull();
  expect(getByText('Load next year')).toBeVisible();
  expect(getByText('some repo')).toBeVisible();
});

test('searches repos with the localStorage criteria', async () => {
  jest
    .spyOn(Date, 'now')
    .mockImplementation(() => new Date('2019-11-28').valueOf());

  localStorage.setItem(
    'grs-search-criteria',
    JSON.stringify({
      sort: 'stars',
      languages: ['JavaScript', 'TypeScript'],
      timeRange: toTimeRange('weekly'),
      order: 'desc',
      page: 0,
      per_page: 20
    })
  );

  const { getByTestId, getByText, queryByText, queryByTestId } = render(
    <App />
  );

  expect(getByText('JavaScript, TypeScript')).toBeVisible();
  expect(getByText('Weekly')).toBeVisible();
  expect(getByText('8 days ago')).toBeVisible();
  expect(getByText('November 20, 2019 – November 27, 2019')).toBeVisible();
  expect(getByTestId('spinner')).toBeVisible();
  expect(queryByText('Load next week')).toBeNull();
  expect(mockSearchRepos).toBeCalledWith({
    q: 'language:JavaScript+language:TypeScript+created:2019-11-20..2019-11-27',
    sort: 'stars'
  });
  expect(JSON.parse(localStorage.getItem('grs-search-criteria'))).toEqual({
    sort: 'stars',
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
    mockResolveRepos(
      createSearchReposResponse([{ html_url: 'repo_url', name: 'some repo' }])
    );
  });

  expect(queryByTestId('spinner'));
  expect(getByText('Load next week')).toBeVisible();
  expect(getByText('some repo')).toBeVisible();
});

test('allows loading the next increment of results', async () => {
  jest
    .spyOn(Date, 'now')
    .mockImplementation(() => new Date('2019-11-28').valueOf());

  const { getByTestId, getByText, queryByText, queryByTestId } = render(
    <App />
  );

  await act(async () => {
    mockResolveRepos(
      createSearchReposResponse([{ html_url: 'repo_url', name: 'some repo' }])
    );
  });

  expect(queryByTestId('spinner')).toBeNull();
  const loadNext = getByText('Load next year');
  expect(loadNext).toBeVisible();

  fireEvent.click(loadNext);

  expect(getByTestId('spinner')).toBeVisible();
  expect(getByText('2 years ago')).toBeVisible();
  expect(getByText('November 27, 2017 – November 27, 2018')).toBeVisible();
  expect(queryByText('Load next year')).toBeNull();
  expect(mockSearchRepos).toBeCalledWith({
    q: 'created:2017-11-27..2018-11-27',
    sort: 'stars'
  });

  await act(async () => {
    mockResolveRepos(
      createSearchReposResponse([
        { html_url: 'other_repo_url', name: 'some other repo' }
      ])
    );
  });

  expect(queryByTestId('spinner')).toBeNull();
  expect(getByText('Load next year')).toBeVisible();
  expect(getByText('some other repo')).toBeVisible();
});

test('searches repos when the language changes', async () => {
  jest
    .spyOn(Date, 'now')
    .mockImplementation(() => new Date('2019-11-28').valueOf());

  localStorage.setItem(
    'grs-languages',
    JSON.stringify(['JavaScript', 'TypeScript'])
  );

  const {
    getByText,
    getByTestId,
    queryByText,
    getByPlaceholderText,
    getByRole,
    queryByRole,
    queryByTestId
  } = render(<App />);

  await act(async () => {
    mockResolveRepos(
      createSearchReposResponse([{ html_url: 'repo_url', name: 'some repo' }])
    );
  });

  fireEvent.click(getByText('Load next year'));

  await act(async () => {
    mockResolveRepos(
      createSearchReposResponse([
        { html_url: 'other_repo_url', name: 'some other repo' }
      ])
    );
  });

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

  expect(queryByRole('dialog')).toBeNull();
  expect(getByText('TypeScript')).toBeVisible();
  expect(getByText('Yearly')).toBeVisible();
  expect(getByText('A year ago')).toBeVisible();
  expect(getByText('November 27, 2018 – November 27, 2019')).toBeVisible();
  expect(getByTestId('spinner')).toBeVisible();
  expect(queryByText('Load next year')).toBeNull();
  expect(queryByText('2 years ago')).toBeNull();
  expect(mockSearchRepos).toBeCalledWith({
    q: 'language:TypeScript+created:2018-11-27..2019-11-27',
    sort: 'stars'
  });

  await act(async () => {
    mockResolveRepos(
      createSearchReposResponse([{ html_url: 'repo_url', name: 'some repo' }])
    );
  });

  expect(queryByTestId('spinner')).toBeNull();
  expect(getByText('Load next year')).toBeVisible();
  expect(getByText('some repo')).toBeVisible();
});

test('searches repos when the time increment changes', async () => {
  jest
    .spyOn(Date, 'now')
    .mockImplementation(() => new Date('2019-11-28').valueOf());

  const {
    getByText,
    getByTestId,
    queryByText,
    getByRole,
    queryByRole,
    queryByTestId
  } = render(<App />);

  await act(async () => {
    mockResolveRepos(
      createSearchReposResponse([{ html_url: 'repo_url', name: 'some repo' }])
    );
  });

  fireEvent.click(getByText('Load next year'));

  await act(async () => {
    mockResolveRepos(
      createSearchReposResponse([
        { html_url: 'other_repo_url', name: 'some other repo' }
      ])
    );
  });

  expect(getByText('2 years ago')).toBeVisible();

  fireEvent.click(getByText('Yearly'));

  expect(getByRole('menu')).toBeVisible();
  expect(getByText('Monthly')).toBeVisible();
  expect(getByText('Weekly')).toBeVisible();
  expect(getByText('Daily')).toBeVisible();

  fireEvent.click(getByText('Weekly'));

  expect(queryByRole('menu')).toBeNull();
  expect(getByText('Weekly')).toBeVisible();
  expect(getByText('8 days ago')).toBeVisible();
  expect(getByText('November 20, 2019 – November 27, 2019')).toBeVisible();
  expect(getByTestId('spinner')).toBeVisible();
  expect(queryByText('Load next week')).toBeNull();
  expect(queryByText('2 years ago')).toBeNull();
  expect(mockSearchRepos).toBeCalledWith({
    q: 'created:2019-11-20..2019-11-27',
    sort: 'stars'
  });

  await act(async () => {
    mockResolveRepos(
      createSearchReposResponse([{ html_url: 'repo_url', name: 'some repo' }])
    );
  });

  expect(queryByTestId('spinner')).toBeNull();
  expect(getByText('Load next week')).toBeVisible();
  expect(getByText('some repo')).toBeVisible();
});
