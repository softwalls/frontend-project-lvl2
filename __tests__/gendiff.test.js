/* eslint-disable no-undef */

import { readFileSync } from 'fs';
import { genDiff } from '../src/genDiff';

// исходники для тестов

const pathDiff = './__fixtures__/diff';
// const path2 = '/Users/softwalls/JS_Projects/frontend-project-lvl2/src/file2.json';
// const file1 = readFileSync(path1);
// const file2 = readFileSync(path2);

// describe('getJson', () => {
//   test('returns json from path', () => {
//     expect(getJson(`file1.json`)).toStrictEqual();
//     expect(getJson(path1)).not.toStrictEqual(json2);
//   });
// });
let jsonPath1;
let jsonPath2;
let yamlPath1;
let yamlPath2;

describe('genDiff', () => {
  beforeEach(() => {
    jsonPath1 = './__fixtures__/file1.json';
    jsonPath2 = './__fixtures__/file2.json';
    yamlPath1 = './__fixtures__/file1.yml';
    yamlPath2 = './__fixtures__/file2.yml';
  });

  test('works fine with JSON files', () => {
    expect(genDiff(jsonPath1, jsonPath2)).toStrictEqual(`${readFileSync(pathDiff)}`);
  });

  test('works with YAML files', () => {
    expect(genDiff(yamlPath1, yamlPath2)).toStrictEqual(`${readFileSync(pathDiff)}`);
  });

  test('works with different type of files', () => {
    expect(genDiff(jsonPath1, yamlPath2)).toStrictEqual(`${readFileSync(pathDiff)}`);
  });
});
