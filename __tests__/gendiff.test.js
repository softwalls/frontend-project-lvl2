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
const pathPlainDiff = './__fixtures__/plain.txt';

let treeJsonPath1;
let treeJsonPath2;
let treeYamlPath1;
let treeYamlPath2;

describe('genDiff with stylish', () => {
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
    expect(genDiff(treeJsonPath1, treeJsonPath2, 'tree')).toStrictEqual(`${readFileSync(pathTreeDiff)}`);
  });

  test('works with tree-like YAML files', () => {
    expect(genDiff(treeYamlPath1, treeYamlPath2, 'tree')).toStrictEqual(`${readFileSync(pathTreeDiff)}`);
  });

  test('works with different type of tree-like files', () => {
    expect(genDiff(treeJsonPath1, treeYamlPath2, 'tree')).toStrictEqual(`${readFileSync(pathTreeDiff)}`);
  });
});

describe('genDiff with plain', () => {
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

  test('works with tree-like JSON files', () => {
    expect((genDiff(treeJsonPath1, treeJsonPath2, 'plain'))).toStrictEqual(`${readFileSync(pathPlainDiff)}`);
  });

  test('works with tree-like YAML files', () => {
    expect(genDiff(treeYamlPath1, treeYamlPath2, 'plain')).toStrictEqual(`${readFileSync(pathPlainDiff)}`);
  });

  test('works with different type of tree-like files', () => {
    expect(genDiff(treeJsonPath1, treeYamlPath2, 'plain')).toStrictEqual(`${readFileSync(pathPlainDiff)}`);
  });
});
