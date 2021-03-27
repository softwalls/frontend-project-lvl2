import _ from 'lodash';

const isObject = (value) => {
  if (_.isObject(value) && !Array.isArray(value)) {
    return true;
  }
  return false;
};
const plain = (diff) => {
  const iter = (currentValue, path) => {
    const lines = currentValue.reduce((acc, node) => {
      let currentPath;
      const getNodeValue = (currentNode, condition) => {
        let value;
        if (condition === 'before') {
          value = currentNode.beforeValue;
        } else {
          value = currentNode.value;
        }
        if (isObject(value)) {
          return '[complex value]';
        }
        if (typeof value === 'string') {
          return `'${value}'`;
        }
        return value;
      };
      if (Array.isArray(node.value)) {
        currentPath = (path === undefined) ? `${node.name}` : `${path}.${node.name}`;
        acc.push(iter(node.value, currentPath));
      } else {
        currentPath = (path === undefined) ? `${node.name}` : `${path}.${node.name}`;
        if (node.status === 'added') {
          acc.push(`Property '${currentPath}' was added with value: ${getNodeValue(node)}`);
        } else if (node.status === 'deleted') {
          acc.push(`Property '${currentPath}' was removed`);
        } else if (node.status === 'changed') {
          acc.push(`Property '${currentPath}' was updated. From ${getNodeValue(node, 'before')} to ${getNodeValue(node)}`);
        // acc.push(currentPath, node.status);
        }
      }
      return acc;
    }, []);
    // console.log(lines);
    return lines.flat(Infinity);
  };
  const result = iter(diff);
  // console.log(result);

  return [...result]
    .join('\n');
};

export default plain;
