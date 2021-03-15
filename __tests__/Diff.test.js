/* eslint-disable no-undef */
import Diff from '../src/Diff.js';

// исходники для тестов

// const pathDiff = './__fixtures__/diff';

const file1 = {
  name: 'lesia',
  position: 'photo',
  children: {
    son1: 'velimir',
  },
  body: null,
};

const file2 = {
  name: 'lesia',
  position: 'editor',
  color: 'green',
  children: {
    son1: 'velimir',
    son2: 'platon',
  },
  body: {
    height: 150,
    weight: 50,
  },
};

const diffResult = {
  name: {
    new: 'lesia',
    old: 'lesia',
  },
  position: {
    old: 'photo',
    new: 'editor',
  },
  children: {
    old: {
      son1: 'velimir',
    },
    new: {
      son1: 'velimir',
      son2: 'platon',
    },
  },
  color: {
    old: undefined,
    new: 'green',
  },
  body: {
    old: null,
    new: {
      height: 150,
      weight: 50,
    },
  },
};

// ================================================================
//                      ТЕСТЫ ДЛЯ ПЛОСКИХ ФАЙЛОВ
// ================================================================

test('works fine with JSON files', () => {
  expect(new Diff(file1, file2)).toStrictEqual(diffResult);
});

// ================================================================
//                  ТЕСТЫ ДЛЯ ДРЕВОВИДНЫХ ФАЙЛОВ
// ================================================================

//   test('works with tree-like JSON files', () => {
//     expect(genDiff(treeJsonPath1, treeJsonPath2)).toStrictEqual(`${readFileSync(pathTreeDiff)}`);
//   });

//   test('works with tree-like YAML files', () => {
//     expect(genDiff(treeYamlPath1, treeYamlPath2)).toStrictEqual(`${readFileSync(pathTreeDiff)}`);
//   });

//   test('works with different type of tree-like files', () => {
//     expect(genDiff(treeJsonPath1, treeYamlPath2)).toStrictEqual(`${readFileSync(pathTreeDiff)}`);
//   });
// });
