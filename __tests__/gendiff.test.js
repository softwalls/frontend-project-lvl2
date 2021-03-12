/* eslint-disable no-undef */

import { readFileSync } from 'fs';
import { genDiff, getJson } from '../src/genDiff';

// исходники для тестов

const path1 = './__fixtures__/diff';
// const path2 = '/Users/softwalls/JS_Projects/frontend-project-lvl2/src/file2.json';
// const file1 = readFileSync(path1);
// const file2 = readFileSync(path2);

// describe('getJson', () => {
//   test('returns json from path', () => {
//     expect(getJson(`file1.json`)).toStrictEqual();
//     expect(getJson(path1)).not.toStrictEqual(json2);
//   });
// });
let filepath1;
let filepath2;

describe('genDiff', () => {
  beforeEach(() => {
    filepath1 = 'file1.json';
    filepath2 = 'file2.json';
  });

  test('some deleted, added and remained same props', () => {
    expect(genDiff(filepath1, filepath2)).toStrictEqual(`${readFileSync(path1)}`);
  });
});
