"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJson = exports.genDiff = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getJson = function getJson(pathString) {
  var result = (0, _fs.readFileSync)(pathString);
  return JSON.parse(result);
};
/*
const genDiff = (json1, json2) => {
  const jsonKeys1 = Object.keys(json1).sort();
  //const jsonKeys2 = Object.keys(json2).sort();
  const getStringForProps = (key) => {
    if (json1[key] === json2[key]) {
      return `    ${key}: ${json1[key]}`;
    }
    // return false;
  }
  

  let result = jsonKeys1.reduce((acc, prop) => {
    let totalString = acc;
      totalString += `\n${getStringForProps(prop)}`;
    return totalString;
  }, ``);
  return `{${result}\n}`;

}  
*/


exports.getJson = getJson;

var genDiff = function genDiff(json1, json2) {
  var getPropsToCheck = function getPropsToCheck() {
    var resultObj = {};
    Object.assign(resultObj, json1, json2);
    return Object.keys(resultObj).sort();
  };

  return getPropsToCheck();
}; // каждое свойство json1 сравниваем с таким же в json2
// если в json2 такого нет - записываем key:value из json1 со знаком -
// если перемены - записываем из json1 со знаком - и следом из json2 со знаком +
// проходимся по свойствам json2 и записываем все которых нет в json1 со знаком +


exports.genDiff = genDiff;