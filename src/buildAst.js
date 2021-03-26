import _ from 'lodash';

const buildAst = (oldData, newData) => {
  const isObject = (value) => {
    if (_.isObject(value) && !Array.isArray(value)) {
      return true;
    }
    return false;
  };
  const keysCollection = Object.keys({ ...oldData, ...newData }).sort();
  const nodeCollection = keysCollection.map((key) => {
    const node = {
      name: key,
    };
    if (isObject(oldData[key]) && isObject(newData[key])) {
      node.value = buildAst(oldData[key], newData[key]);
      return node;
      // console.log('node value ======> ', node.value);
    }
    if (oldData[key] === newData[key]) {
      node.value = newData[key];
      node.status = 'untouched';
    } else if (oldData[key] === undefined) {
      node.value = newData[key];
      node.status = 'added';
    } else if (newData[key] === undefined) {
      node.value = oldData[key];
      node.beforeValue = oldData[key];
      node.status = 'deleted';
    } else {
      node.value = newData[key];
      node.beforeValue = oldData[key];
      node.status = 'changed';
    }

    return node;
  });
  // console.log(JSON.stringify(nodeCollection, null, 4));
  return nodeCollection;
};

export default buildAst;
