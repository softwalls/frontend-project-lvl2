/* eslint-disable no-undef */
/*
Требования:

- Сравниваются данные, а не строки файлов.
- Две строчки дифа, отвечающие за различия поля,
  должны находиться рядом.
  Причем вначале должна выводиться строка относящаяся
  к первому файлу, а затем строка относящаяся ко
  второму файлу (см. пример с timeout).
- Результатом работы функции genDiff() является строка.

*/
import { readFileSync } from 'fs';
import { genDiff, getJson } from '../src/genDiff.js';

// исходники для тестов

const path1 = '/Users/softwalls/JS_Projects/frontend-project-lvl2/src/file1.json';
// const path2 = '/Users/softwalls/JS_Projects/frontend-project-lvl2/src/file2.json';
// const file1 = readFileSync(path1);
// const file2 = readFileSync(path2);

describe('getJson', () => {
  test('returns json from path', () => {
    expect(getJson(path1)).toStrictEqual(json1);
    expect(getJson(path1)).not.toStrictEqual(json2);
  });
});

describe('genDiff', () => {
  test('some deleted, added and remained same props', () => {
    expect(genDiff(json1, json2)).toStrictEqual(oneToTwoJson);
  })
})
