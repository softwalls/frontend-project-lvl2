import isObject from '../isObject.js';

const getNodeValue = (currentNode, condition) => {
  const value = (condition === 'before') ? currentNode.beforeValue : currentNode.value;

  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getLine = (node, path) => {
  if (node.status === 'added') {
    return `Property '${path}' was added with value: ${getNodeValue(node)}`;
  }
  if (node.status === 'removed') {
    return `Property '${path}' was removed`;
  }
  if (node.status === 'updated') {
    return `Property '${path}' was updated. From ${getNodeValue(node, 'before')} to ${getNodeValue(node)}`;
  }
  return null;
  console.log(path, getNodeValue(node));
};

const plain = (diff) => {
  const iter = (currentValue, path) => {
    // console.log(currentValue);
    const lines = currentValue.reduce((acc, node) => {
      const currentPath = (path === undefined) ? `${node.name}` : `${path}.${node.name}`;
      const line = (node.children !== undefined)
        ? iter(node.children, currentPath)
        : getLine(node, currentPath);
      acc.push(line);
      // console.log(line);
      return acc;
    }, []);
    return lines.flat(Infinity);
  };
  const result = iter(diff);
  // console.log(result);

  return [...result]
    .filter((line) => line !== null)
    .join('\n');
};

export default plain;
