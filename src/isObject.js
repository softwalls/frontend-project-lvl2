import _ from 'lodash';

const isObject = (value) => {
  if (_.isObject(value) && !Array.isArray(value)) {
    return true;
  }
  return false;
};

export default isObject;
