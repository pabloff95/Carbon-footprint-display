import { getApiUrl } from './getApiUrl';
import { test, expect } from '@jest/globals';

test('Test getApiUrl output', () => {
  expect(getApiUrl()).toBe('http://localhost:3000');
});
