import isObject from './isObject.js';

const getNode = (obj1, obj2, key) => {
  const node = {};
  if (obj1[key] === obj2[key]) {
    node.value = obj2[key];
    node.status = 'untouched';
  } else if (obj1[key] === undefined) {
    node.value = obj2[key];
    node.status = 'added';
  } else if (obj2[key] === undefined) {
    node.value = obj1[key];
    node.status = 'removed';
  } else {
    node.value = obj2[key];
    node.beforeValue = obj1[key];
    node.status = 'updated';
  }
  return node;
};

const buildAst = (oldData, newData) => {
  const keysCollection = Object.keys({ ...oldData, ...newData }).sort();
  const nodeCollection = keysCollection.map((key) => {
    const node = {
      name: key,
    };
    if (isObject(oldData[key]) && isObject(newData[key])) {
      node.children = buildAst(oldData[key], newData[key]);
      return node;
      // console.log('node value ======> ', node.value);
    }
    const nodeBody = getNode(oldData, newData, key);

    return {
      ...node,
      ...nodeBody,
    };
  });
  // console.log(JSON.stringify(nodeCollection, null, 4));
  return nodeCollection;
};

export default buildAst;
