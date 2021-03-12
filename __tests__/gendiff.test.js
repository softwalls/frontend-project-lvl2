/* eslint-disable no-undef */

import { readFileSync } from 'fs';
import { genDiff } from '../src/genDiff';

// исходники для тестов

// const pathDiff = './__fixtures__/diff';

// let jsonPath1;
// let jsonPath2;
// let yamlPath1;
// let yamlPath2;

const pathTreeDiff = './__fixtures__/tree_diff.txt';

let treeJsonPath1;
let treeJsonPath2;
let treeYamlPath1;
let treeYamlPath2;

describe('genDiff', () => {
  beforeEach(() => {
    // jsonPath1 = './__fixtures__/file1.json';
    // jsonPath2 = './__fixtures__/file2.json';
    // yamlPath1 = './__fixtures__/file1.yml';
    // yamlPath2 = './__fixtures__/file2.yml';
    treeJsonPath1 = './__fixtures__/tree1.json';
    treeJsonPath2 = './__fixtures__/tree2.json';
    treeYamlPath1 = './__fixtures__/tree1.yml';
    treeYamlPath2 = './__fixtures__/tree2.yml';
  });

  /*

  // ================================================================
  //                      ТЕСТЫ ДЛЯ ПЛОСКИХ ФАЙЛОВ
  // ================================================================

  test('works fine with JSON files', () => {
    expect(genDiff(jsonPath1, jsonPath2)).toStrictEqual(`${readFileSync(pathDiff)}`);
  });

  test('works with YAML files', () => {
    expect(genDiff(yamlPath1, yamlPath2)).toStrictEqual(`${readFileSync(pathDiff)}`);
  });

  test('works with different type of files', () => {
    expect(genDiff(jsonPath1, yamlPath2)).toStrictEqual(`${readFileSync(pathDiff)}`);
  });

*/

  // ================================================================
  //                  ТЕСТЫ ДЛЯ ДРЕВОВИДНЫХ ФАЙЛОВ
  // ================================================================

  test('works with tree-like JSON files', () => {
    expect(genDiff(treeJsonPath1, treeJsonPath2)).toStrictEqual(`${readFileSync(pathTreeDiff)}`);
  });

  test('works with tree-like YAML files', () => {
    expect(genDiff(treeYamlPath1, treeYamlPath2)).toStrictEqual(`${readFileSync(pathTreeDiff)}`);
  });
  test('works with different type of tree-like files', () => {
    expect(genDiff(treeJsonPath1, treeYamlPath2)).toStrictEqual(`${readFileSync(pathTreeDiff)}`);
  });
});
