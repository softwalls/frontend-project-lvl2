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
import { genDiff, getJson } from '../src/genDiff.js';
import { readFileSync } from 'fs';

// исходники для тестов

const path1 = '/Users/softwalls/JS_Projects/frontend-project-lvl2/src/file1.json';
const path2 = '/Users/softwalls/JS_Projects/frontend-project-lvl2/src/file2.json';
const file1 = readFileSync(path1);
const file2 = readFileSync(path2);

const json1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};
const json2 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
};
const sameJson1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};

const oneToTwoJson = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const sameJson1Result = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`;

const cleanedJson1 = `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`
const emptyJson = {};
 


describe('getJson', () => {
  test('returns json from path', () => {
    expect(getJson(path1)).toStrictEqual(json1);
    expect(getJson(path1)).not.toStrictEqual(json2);
  });
})

describe('genDiff', () => {
  test('changes were not made', () => {
    expect(genDiff(json1, sameJson1)).toBe(sameJson1Result);
  })
  test('some props were deleted', () => {
    expect(genDiff(json1, emptyJson)).toStrictEqual(cleanedJson1);
  })
  test('some deleted, added and remained same props', () => {
    expect(genDiff(json1, json2)).toStrictEqual(oneToTwoJson);
  })
})
