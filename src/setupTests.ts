import '@testing-library/jest-dom/extend-expect';
import { set as setDate } from 'mockdate';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

setDate('2019-11-28');

beforeEach(() => {
  mockAllIsIntersecting(false);
  setDate('2019-11-28');
  localStorage.clear();
});
