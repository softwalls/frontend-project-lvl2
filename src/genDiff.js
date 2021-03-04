import _ from 'lodash';
import { readFileSync } from 'fs';

const getJson = (pathString) => {
  const result = readFileSync(pathString);
  return JSON.parse(result);
}

const genDiff = (json1, json2) => {
  const jsonKeys1 = Object.keys(json1).sort();
  //const jsonKeys2 = Object.keys(json2).sort();
  let result;
  if (_.isEqual(json1, json2)) {
    result = jsonKeys1.reduce((acc, key) => {
      acc[key] = json1[key];
      return acc;
    }, {})
  }
  return JSON.stringify(result);
}

// каждое свойство json1 сравниваем с таким же в json2
// если в json2 такого нет - записываем key:value из json1 со знаком -
// если перемены - записываем из json1 со знаком - и следом из json2 со знаком +
// проходимся по свойствам json2 и записываем все которых нет в json1 со знаком +



export {
  genDiff,
  getJson
};