import _ from 'lodash';
import isObject from './isObject.js';

// const getNode = (obj1, obj2, key) => {
//   const node = {};
//   if (obj1[key] === obj2[key]) {
//     node.value = obj2[key];
//     node.status = 'untouched';
//   } else if (obj1[key] === undefined) {
//     node.value = obj2[key];
//     node.status = 'added';
//   } else if (obj2[key] === undefined) {
//     node.value = obj1[key];
//     node.status = 'removed';
//   } else {
//     node.value = obj2[key];
//     node.beforeValue = obj1[key];
//     node.status = 'updated';
//   }
//   return node;
// };

const getNode = (obj1, obj2, key) => {
  if (obj1[key] === obj2[key]) {
    return {
      value: obj2[key],
      status: 'untouched',
    };
  }

  if (obj1[key] === undefined) {
    return {
      value: obj2[key],
      status: 'added',
    };
  }

  if (obj2[key] === undefined) {
    return {
      value: obj1[key],
      status: 'removed',
    };
  }

  return {
    value: obj2[key],
    beforeValue: obj1[key],
    status: 'updated',
  };
};

const buildAst = (oldData, newData) => {
  const keysCollection = _.sortBy(
    Object.keys({ ...oldData, ...newData }),
  );
  const nodeCollection = keysCollection.map((key) => {
    const node = {
      name: key,
    };
    if (isObject(oldData[key]) && isObject(newData[key])) {
      const children = buildAst(oldData[key], newData[key]);
      return {
        ...node,
        children,
      };
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
