import '@testing-library/jest-dom/extend-expect';
import faker from 'faker';
import {
  act,
  fireEvent,
  render,
  wait,
  RenderOptions
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { verifyAllWhenMocksCalled, when, resetAllWhenMocks } from 'jest-when';
import { set as setDate } from 'mockdate';
import moment from 'moment';
import React from 'react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import * as api from '../api';
import { Repo } from '../repo';
import {
  createSearchCriteria,
  initialLanguagesState,
  initialSearchCriteriaState,
  SearchCriteria,
  Language,
  LanguageState
} from '../search-criteria';
import { createTimeRange, toTimeRange } from '../time';
import { App } from './App';
import { SearchTypes } from '../search-type';

jest.mock('../api');
const mockApi = api as jest.Mocked<typeof api>;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
});

afterEach(() => {
  setDate('2019-11-28');
  localStorage.clear();
  resetAllWhenMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

function getSearchCriteria() {
  return JSON.parse(localStorage.getItem('grs-search-criteria'));
}

function setSearchCriteria(criteria: SearchCriteria) {
  localStorage.setItem('grs-search-criteria', JSON.stringify(criteria));
}

function getLanguages() {
  return JSON.parse(localStorage.getItem('grs-languages'));
}

function setLanguages(languagesState: typeof initialLanguagesState) {
  localStorage.setItem('grs-languages', JSON.stringify(languagesState));
}

function getSearchType() {
  return JSON.parse(localStorage.getItem('grs-search-type'));
}

function setSearchType(searchType: SearchTypes) {
  localStorage.setItem('grs-search-type', searchType);
}

function repoBuilder(): Repo {
  return {
    name: faker.name.findName(),
    url: faker.internet.url(),
    owner: {
      name: faker.name.findName(),
      url: faker.internet.url(),
      avatarUrl: faker.internet.url()
    },
    createdAt: moment(faker.date.past()).format(),
    description: faker.lorem.sentence(),
    language: faker.lorem.word(),
    languageColor: faker.internet.color(),
    stars: faker.random.number(),
    currentPeriodStars: faker.random.number(),
    forks: faker.random.number(),
    issues: faker.random.number()
  };
}

function languageBuilder(): Language {
  return {
    name: faker.lorem.word(),
    color: faker.internet.color()
  };
}

function renderApp(
  ui = <App />,
  {
    languagesState = { languages: [], timestamp: moment().format() },
    searchCriteriaState,
    searchTypeState,
    ...options
  }: RenderOptions & {
    languagesState?: LanguageState;
    searchCriteriaState?: SearchCriteria;
    searchTypeState?: SearchTypes;
  } = {}
) {
  setLanguages(languagesState);

  if (searchCriteriaState) {
    setSearchCriteria(searchCriteriaState);
  }

  if (searchTypeState) {
    setSearchType(searchTypeState);
  }

  const utils = render(ui, options);

  async function whenTheMostStarredReposResolve() {
    await wait(() =>
      expect(utils.queryAllByLabelText('Repo loading...').length).toBe(3)
    );
    mockApi.fetchRepos.mockClear();
  }

  async function whenTheTrendingReposResolve() {
    await wait(() =>
      expect(utils.queryAllByLabelText('Repo loading...').length).toBe(0)
    );
    mockApi.fetchRepos.mockClear();
  }

  function whenTheAppIsScrolledToBottom() {
    act(() => {
      mockAllIsIntersecting(true);
    });
  }

  function thenTheSearchResultsContain(
    results: {
      header: string;
      subheader: string;
      repos: [string, boolean][];
    }[]
  ) {
    results.forEach(({ header, subheader, repos }) => {
      expect(utils.getByText(header)).toBeVisible();
      expect(utils.getByText(subheader)).toBeVisible();
      repos.forEach(([repo, expected]) => {
        if (expected) {
          expect(utils.getByText(repo)).toBeVisible();
        } else {
          expect(utils.queryByText(repo)).toBeNull();
        }
      });
    });
  }

  function thenTheActiveSearchTypeIs(searchType: string) {
    expect(utils.getByText(searchType)).toBeVisible();
  }

  function whenISelectTheSearchType(searchType: string) {
    act(() => {
      userEvent.selectOptions(
        utils.getByLabelText('Search type'),
        searchType.toLowerCase()
      );
    });
  }

  function thenTheActiveLanguageFiltersAre(languages: string[]) {
    expect(utils.getByText(languages.join(', '))).toBeVisible();
  }

  function thenTheActiveTimeRangeIs(timeRange: string) {
    expect(utils.getByText(timeRange)).toBeVisible();
  }

  function whenIOpenTheTimeRangeFilter() {
    fireEvent.click(utils.getByTestId('time-range-filter'));
  }

  async function whenTheTimeRangeFilterOptionsAreVisible(expected: boolean) {
    if (expected) {
      expect(utils.getByRole('menu')).toBeVisible();
      expect(utils.getByText('Monthly')).toBeVisible();
      expect(utils.getByText('Weekly')).toBeVisible();
      expect(utils.getByText('Daily')).toBeVisible();
    } else {
      await wait(() => {
        expect(utils.queryByRole('menu')).toBeNull();
      });
    }
  }

  function whenISelectTheTimeRangeFilter(filter: string) {
    fireEvent.click(utils.getByText(filter));
  }

  async function whenIOpenTheLanguagesFilter() {
    fireEvent.click(utils.getByTestId('languages-filter'));
    await wait(() => {
      expect(utils.getByRole('dialog')).toBeVisible();
    });
  }

  function thenTheLanguagesFilterHasLanguages(languages: [string, boolean][]) {
    languages.forEach(([language, expected]) => {
      if (expected) {
        expect(utils.getByText(language)).toBeVisible();
      } else {
        expect(utils.queryByText(language)).toBeNull();
      }
    });
  }

  function whenITypeInTheLanguageFilter(language: string) {
    userEvent.type(utils.getByPlaceholderText('Filter...'), language);
  }

  function whenISelectTheLanguagesFilterLanguage(language: string) {
    fireEvent.click(utils.getByText(language));
  }

  function whenIRefreshTheSearch() {
    fireEvent.click(utils.getByLabelText('refresh'));
  }

  return {
    ...utils,
    whenTheMostStarredReposResolve,
    whenTheTrendingReposResolve,
    whenTheAppIsScrolledToBottom,
    thenTheSearchResultsContain,
    thenTheActiveSearchTypeIs,
    whenISelectTheSearchType,
    thenTheActiveLanguageFiltersAre,
    thenTheActiveTimeRangeIs,
    whenIOpenTheLanguagesFilter,
    whenTheTimeRangeFilterOptionsAreVisible,
    whenISelectTheTimeRangeFilter,
    thenTheLanguagesFilterHasLanguages,
    whenITypeInTheLanguageFilter,
    whenISelectTheLanguagesFilterLanguage,
    whenIOpenTheTimeRangeFilter,
    whenIRefreshTheSearch
  };
}

test('searches repos with the default criteria', async () => {
  const repos = [repoBuilder(), repoBuilder()];

  when(mockApi.fetchRepos)
    .expectCalledWith('most-starred', initialSearchCriteriaState, '')
    .mockResolvedValueOnce([repos[0]]);

  when(mockApi.fetchRepos)
    .expectCalledWith(
      'most-starred',
      createSearchCriteria(
        initialSearchCriteriaState.languages,
        createTimeRange(initialSearchCriteriaState.timeRange.increments, 1)
      ),
      ''
    )
    .mockResolvedValueOnce([repos[1]]);

  const {
    whenTheMostStarredReposResolve,
    whenTheAppIsScrolledToBottom,
    thenTheSearchResultsContain,
    thenTheActiveLanguageFiltersAre,
    thenTheActiveTimeRangeIs,
    thenTheActiveSearchTypeIs
  } = renderApp(<App />);

  expect(getSearchCriteria()).toEqual(initialSearchCriteriaState);

  thenTheActiveSearchTypeIs('Most starred');
  thenTheActiveLanguageFiltersAre(['Filter languages']);
  thenTheActiveTimeRangeIs('Yearly');

  await whenTheMostStarredReposResolve();

  thenTheSearchResultsContain([
    {
      header: 'A year ago',
      subheader: 'November 27, 2018 – November 27, 2019',
      repos: [[repos[0].name, true]]
    }
  ]);

  whenTheAppIsScrolledToBottom();
  await whenTheMostStarredReposResolve();

  thenTheSearchResultsContain([
    {
      header: 'A year ago',
      subheader: 'November 27, 2018 – November 27, 2019',
      repos: [[repos[0].name, true]]
    },
    {
      header: '2 years ago',
      subheader: 'November 27, 2017 – November 27, 2018',
      repos: [[repos[1].name, true]]
    }
  ]);

  verifyAllWhenMocksCalled();
});

test('searches repos with the localStorage criteria', async () => {
  const languages = [languageBuilder().name, languageBuilder().name];
  const searchCriteriaState = createSearchCriteria(
    languages,
    toTimeRange('weekly')
  );

  const repos = [repoBuilder(), repoBuilder()];

  when(mockApi.fetchRepos)
    .expectCalledWith('most-starred', searchCriteriaState, '')
    .mockResolvedValueOnce(repos);

  const {
    whenTheMostStarredReposResolve,
    thenTheSearchResultsContain
  } = renderApp(<App />, {
    searchCriteriaState
  });

  expect(getSearchCriteria()).toEqual(searchCriteriaState);

  await whenTheMostStarredReposResolve();

  thenTheSearchResultsContain([
    {
      header: '8 days ago',
      subheader: 'November 20, 2019 – November 27, 2019',
      repos: [
        [repos[0].name, true],
        [repos[1].name, true]
      ]
    }
  ]);

  verifyAllWhenMocksCalled();
});

test('searches repos when the language changes', async () => {
  const languages = [languageBuilder(), languageBuilder()];
  const languagesState = { languages, timestamp: moment().format() };

  const repos = [repoBuilder(), repoBuilder()];

  when(mockApi.fetchRepos)
    .expectCalledWith('most-starred', initialSearchCriteriaState, '')
    .mockResolvedValueOnce([repos[0]]);

  when(mockApi.fetchRepos)
    .expectCalledWith(
      'most-starred',
      createSearchCriteria(
        [languages[1].name],
        initialSearchCriteriaState.timeRange
      ),
      ''
    )
    .mockResolvedValueOnce([repos[1]]);

  const {
    whenTheMostStarredReposResolve,
    thenTheSearchResultsContain,
    whenIOpenTheLanguagesFilter,
    thenTheLanguagesFilterHasLanguages,
    whenITypeInTheLanguageFilter,
    whenISelectTheLanguagesFilterLanguage
  } = renderApp(<App />, { languagesState });

  expect(getLanguages()).toEqual(languagesState);

  await whenTheMostStarredReposResolve();

  thenTheSearchResultsContain([
    {
      header: 'A year ago',
      subheader: 'November 27, 2018 – November 27, 2019',
      repos: [[repos[0].name, true]]
    }
  ]);

  whenIOpenTheLanguagesFilter();
  thenTheLanguagesFilterHasLanguages([
    [languages[0].name, true],
    [languages[1].name, true]
  ]);

  whenITypeInTheLanguageFilter(languages[1].name);
  thenTheLanguagesFilterHasLanguages([
    [languages[0].name, false],
    [languages[1].name, true]
  ]);

  whenISelectTheLanguagesFilterLanguage(languages[1].name);

  await whenTheMostStarredReposResolve();

  thenTheSearchResultsContain([
    {
      header: 'A year ago',
      subheader: 'November 27, 2018 – November 27, 2019',
      repos: [
        [repos[0].name, false],
        [repos[1].name, true]
      ]
    }
  ]);

  verifyAllWhenMocksCalled();
});

test('searches repos when the time increment changes', async () => {
  const repos = [repoBuilder(), repoBuilder()];

  when(mockApi.fetchRepos)
    .expectCalledWith('most-starred', initialSearchCriteriaState, '')
    .mockResolvedValueOnce([repos[0]]);

  when(mockApi.fetchRepos)
    .expectCalledWith(
      'most-starred',
      createSearchCriteria(
        initialSearchCriteriaState.languages,
        createTimeRange('week', 0)
      ),
      ''
    )
    .mockResolvedValueOnce([repos[1]]);

  const {
    whenTheMostStarredReposResolve,
    thenTheActiveTimeRangeIs,
    whenIOpenTheTimeRangeFilter,
    thenTheSearchResultsContain,
    whenTheTimeRangeFilterOptionsAreVisible,
    whenISelectTheTimeRangeFilter
  } = renderApp();

  thenTheActiveTimeRangeIs('Yearly');
  await whenTheTimeRangeFilterOptionsAreVisible(false);

  await whenTheMostStarredReposResolve();

  whenIOpenTheTimeRangeFilter();
  await whenTheTimeRangeFilterOptionsAreVisible(true);

  whenISelectTheTimeRangeFilter('Weekly');
  await whenTheTimeRangeFilterOptionsAreVisible(false);
  thenTheActiveTimeRangeIs('Weekly');

  await whenTheMostStarredReposResolve();

  thenTheSearchResultsContain([
    {
      header: '8 days ago',
      subheader: 'November 20, 2019 – November 27, 2019',
      repos: [
        [repos[0].name, false],
        [repos[1].name, true]
      ]
    }
  ]);

  expect(getSearchCriteria()).toEqual(
    createSearchCriteria(
      initialSearchCriteriaState.languages,
      createTimeRange('week', 0)
    )
  );

  verifyAllWhenMocksCalled();
});

test('allows refreshing the search', async () => {
  const repos = [repoBuilder(), repoBuilder()];

  when(mockApi.fetchRepos)
    .expectCalledWith('most-starred', initialSearchCriteriaState, '')
    .mockResolvedValueOnce([repos[0]]);

  when(mockApi.fetchRepos)
    .expectCalledWith(
      'most-starred',
      createSearchCriteria(initialSearchCriteriaState.languages, {
        from: '2018-11-28',
        increments: 'year',
        to: '2019-11-28'
      }),
      ''
    )
    .mockResolvedValueOnce([repos[1]]);

  const { whenIRefreshTheSearch, whenTheMostStarredReposResolve } = renderApp();

  await whenTheMostStarredReposResolve();

  setDate('2019-11-29');
  whenIRefreshTheSearch();

  expect(getSearchCriteria()).toEqual(
    createSearchCriteria(initialSearchCriteriaState.languages, {
      from: '2018-11-28',
      increments: 'year',
      to: '2019-11-28'
    })
  );

  verifyAllWhenMocksCalled();
});

test('allows searching for trending repos', async () => {
  const repos = [repoBuilder(), repoBuilder()];

  when(mockApi.fetchRepos)
    .expectCalledWith('most-starred', initialSearchCriteriaState, '')
    .mockResolvedValueOnce([repos[0]]);

  when(mockApi.fetchRepos)
    .expectCalledWith('trending', initialSearchCriteriaState, '')
    .mockResolvedValueOnce([repos[1]]);

  const {
    whenTheMostStarredReposResolve,
    whenTheTrendingReposResolve,
    whenTheAppIsScrolledToBottom,
    thenTheActiveSearchTypeIs,
    thenTheSearchResultsContain,
    whenISelectTheSearchType
  } = renderApp();

  thenTheActiveSearchTypeIs('Most starred');

  await whenTheMostStarredReposResolve();

  whenISelectTheSearchType('Trending');
  thenTheActiveSearchTypeIs('Trending');

  await whenTheTrendingReposResolve();

  thenTheSearchResultsContain([
    {
      header: 'A year ago',
      subheader: 'November 27, 2018 – November 27, 2019',
      repos: [
        [repos[0].name, false],
        [repos[1].name, true]
      ]
    }
  ]);

  expect(getSearchType()).toEqual('trending');

  whenTheAppIsScrolledToBottom();
  expect(mockApi.fetchRepos).not.toBeCalled();

  verifyAllWhenMocksCalled();
});

test('gets the latest languages data from github once per day', async () => {
  const languages = [languageBuilder(), languageBuilder()];
  when(mockApi.fetchLanguages)
    .expectCalledWith()
    .mockResolvedValueOnce(languages);

  const {
    unmount,
    rerender,
    whenIOpenTheLanguagesFilter,
    thenTheLanguagesFilterHasLanguages
  } = renderApp();

  expect(mockApi.fetchLanguages).not.toHaveBeenCalled();

  await whenIOpenTheLanguagesFilter();

  setDate('2019-11-30');
  unmount();
  rerender(<App />);

  await whenIOpenTheLanguagesFilter();
  thenTheLanguagesFilterHasLanguages([
    [languages[0].name, true],
    [languages[1].name, true]
  ]);

  verifyAllWhenMocksCalled();
});
