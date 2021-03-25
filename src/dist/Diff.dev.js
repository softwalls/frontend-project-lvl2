"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _stylish = _interopRequireDefault(require("./stylish.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Diff(obj1, obj2) {
  this.obj1 = obj1;
  this.obj2 = obj2; // console.log('DIFF GOT THIS!!!!!!!', obj1, obj2);

  var getPropsToCheck = function getPropsToCheck(file1, file2) {
    var resultObj = {};
    Object.assign(resultObj, file1, file2);
    return Object.keys(resultObj).sort();
  };

  var isObject = function isObject(value) {
    if (_lodash["default"].isObject(value) && !Array.isArray(value)) {
      return true;
    }

    return false;
  };

  var props = getPropsToCheck(obj1, obj2); // console.log('PROPS TO CHECK!!', props);

  var result = props.reduce(function (acc, key) {
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      // console.log('obj1 -> ', obj1, 'obj2 ->', obj2, 'key =>', key);
      acc[key] = "{\n".concat(new Diff(obj1[key], obj2[key]), "}");
    } else {
      // console.log(` MAKE STYLE of => ${obj1[key]} AND ${obj2[key]}`);
      acc[key] = (0, _stylish["default"])(obj1[key], obj2[key]); // console.log(`!!!!!!!!${key}: ${JSON.stringify(acc[key], null, 4)}`);
    } // console.log(JSON.stringify(acc, null, 4));


    return acc;
  }, {}); // console.log(`{\n${JSON.stringify(result)}}`);

  return result;
}

var _default = Diff;
exports["default"] = _default;