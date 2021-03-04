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
import { genDiff } from '../src/genDiff.js';

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

test('shows same json if there are no diffs', () => {
  expect(genDiff(json1, sameJson1)).toBe(JSON.stringify(json1));
});