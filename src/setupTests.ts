import '@testing-library/jest-dom/extend-expect';
import { set as setDate } from 'mockdate';

setDate('2019-11-28');

beforeEach(() => {
  setDate('2019-11-28');
  localStorage.clear();
});
