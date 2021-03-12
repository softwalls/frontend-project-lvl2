import _ from 'lodash';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getJson = (filename) => {
  const rawJson = readFileSync(getFixturePath(`${filename}`));
  const result = JSON.parse(rawJson);
  return result;
};

const genDiff = (json1, json2) => {
  const getPropsToCheck = () => {
    const resultObj = {};
    Object.assign(resultObj, json1, json2);
    return Object.keys(resultObj).sort();
  };

  const generateLineCollection = (props) => {
    const result = props.reduce((acc, prop) => {
      if (_.has(json1, prop) && _.has(json2, prop)) {
        // свойство не изменилось - генерится одна строка
        if (json1[prop] === json2[prop]) {
          acc.push(`    ${prop}: ${json1[prop]}`);
        } else {
          // свойство именилось - генерим две строки(- и +)

          acc.push(`  - ${prop}: ${json1[prop]}`, `  + ${prop}: ${json2[prop]}`);
        }
      } else {
        // свойство исчезло - генерится строка с -
        if (_.has(json1, prop)) {
          acc.push(`  - ${prop}: ${json1[prop]}`);
        }
        if (_.has(json2, prop)) {
          // свойство появилось - генерится строка с +
          acc.push(`  + ${prop}: ${json2[prop]}`);
        }
      }
      return acc;
    }, []);
    return result;
  };
  // сюда мы передаём массив вида ['   key: value',' - key2: value2', '  + key2: value100']
  // и получаем готовый вывод
  const build = (linesCollection) => {
    const result = linesCollection.join('\n');
    return `{\n${result}\n}`;
  };
  const allProps = getPropsToCheck();
  const lines = generateLineCollection(allProps);
  return build(lines);
};

export {
  genDiff,
  getJson,
};

// genDiff(file1, file2)
//   - проверка расширения файлов
//   - для каждого формата - своя функция, 
//       которая принимает файл, парсит, отдаёт отсортированный 
//       в алфавитном порядке (по key) массив [[key, value], [...]].
//   - функция getDiffFromArrs(arr1, arr2) которая и отдаёт строку.
