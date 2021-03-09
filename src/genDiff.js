import _ from 'lodash';
import { readFileSync } from 'fs';

const getJson = (pathString) => {
  const result = readFileSync(pathString);
  return JSON.parse(result);
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
        } else {
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
