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
const json1 = {
  "host": "hexlet.io",
  "timeout": 50
};

const json2 = {
  "host": "hexlet.com",
  "timeout": 50
};

const sameJson1 = {
  "timeout": 50,
  "host": "hexlet.io"
}

const diff = `{
  - "host": "hexlet.io",
  + "host": "hexlet.com",
    "timeout": 50
}`;
const file1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};
const path = '/Users/softwalls/JS_Projects/frontend-project-lvl2/src/file1.json';

test('shows same json if there are no diffs', () => {
  expect(genDiff(json1, sameJson1)).toBe(JSON.stringify(json1));
});

test('readFileSync returns file content', () => {
  expect(JSON.parse(readFileSync(path))).toStrictEqual(file1);
});

test('getJson returns parsed json file content', () => {
  expect(getJson(path)).toStrictEqual(file1);
});