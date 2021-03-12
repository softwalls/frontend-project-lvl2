import _ from 'lodash';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { parseFile } from './parsers.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getJson = (filepath) => {
  const rawJson = readFileSync(getFixturePath(`${filepath}`));
  const result = JSON.parse(rawJson);
  return result;
};

const genDiff = (filepath1, filepath2) => {
  const getAbcoluteFilePath = (somePath) => path.resolve(process.cwd(), somePath);
  // прочитаем файлы

  const file1 = parseFile(getAbcoluteFilePath(filepath1));
  const file2 = parseFile(getAbcoluteFilePath(filepath2));

  // получим свойства для проверки смержив два объекта

  const getPropsToCheck = () => {
    const resultObj = {};
    Object.assign(resultObj, file1, file2);
    return Object.keys(resultObj).sort();
  };
  //  здесь мы каждому полю формируем строку
  const generateLineCollection = (props) => {
    const result = props.reduce((acc, prop) => {
      if (_.has(file1, prop) && _.has(file2, prop)) {
        // свойство не изменилось - генерится одна строка
        if (file1[prop] === file2[prop]) {
          acc.push(`    ${prop}: ${file1[prop]}`);
        } else {
          // свойство именилось - генерим две строки(- и +)

          acc.push(`  - ${prop}: ${file1[prop]}`, `  + ${prop}: ${file2[prop]}`);
        }
      } else {
        // свойство исчезло - генерится строка с -
        if (_.has(file1, prop)) {
          acc.push(`  - ${prop}: ${file1[prop]}`);
        }
        if (_.has(file2, prop)) {
          // свойство появилось - генерится строка с +
          acc.push(`  + ${prop}: ${file2[prop]}`);
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
