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
const pathJsonDiff = './__fixtures__/treeJsonFormatDiff.txt';

const treeJsonPath1 = './__fixtures__/tree1.json';
const treeJsonPath2 = './__fixtures__/tree2.json';
const treeYamlPath1 = './__fixtures__/tree1.yml';
const treeYamlPath2 = './__fixtures__/tree2.yml';

describe('genDiff with stylish', () => {
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

describe('genDiff with json formatter', () => {
  test('works with tree-like JSON files', () => {
    expect((genDiff(treeJsonPath1, treeJsonPath2, 'json'))).toStrictEqual(`${readFileSync(pathJsonDiff)}`);
  });

  test('works with tree-like YAML files', () => {
    expect(genDiff(treeYamlPath1, treeYamlPath2, 'json')).toStrictEqual(`${readFileSync(pathJsonDiff)}`);
  });

  test('works with different type of tree-like files', () => {
    expect(genDiff(treeJsonPath1, treeYamlPath2, 'json')).toStrictEqual(`${readFileSync(pathJsonDiff)}`);
  });
});
