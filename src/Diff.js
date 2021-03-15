import _ from 'lodash';

function Diff(obj1, obj2) {
  this.obj1 = obj1;
  this.obj2 = obj2;

  const getPropsToCheck = (file1, file2) => {
    const resultObj = {};
    Object.assign(resultObj, file1, file2);
    return Object.keys(resultObj).sort();
  };
  const isObject = (value) => {
    if (_.isObject(value) && !Array.isArray(value)) {
      return true;
    }
    return false;
  };
  const props = getPropsToCheck(obj1, obj2);
  return props.reduce((acc, key) => {
    if (isObject(obj1[key] && isObject(obj2[key]))) {
      acc[key] = new Diff(obj1[key], obj2[key]);
    }
    acc[key] = {
      old: obj1[key],
      new: obj2[key],
    };
    return acc;
  }, {});
}

export default Diff;
