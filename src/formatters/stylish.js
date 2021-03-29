import isObject from '../isObject.js';

const stylish = (diff) => {
  // console.log(diff);
  const iter = (currentValue, depth) => {
  // base case: VALUE is primitive or an object
    const indent = ' '.repeat((depth * 4) - 2);
    const bracketindent = ' '.repeat((depth * 4) - 4);
    if (!Array.isArray(currentValue)) {
      if (isObject(currentValue)) {
        const objLines = Object
          .entries(currentValue)
          .map(([key, value]) => `${indent}  ${key}: ${iter(value, depth + 1)}`);
        return ['{', ...objLines, `${bracketindent}}`].join('\n');
      }
      // тут уже только примитивы
      return `${currentValue}`;
    }
    const generateLine = (node) => {
      if (node.value === undefined) {
        return `${indent}  ${node.name}: ${iter(node.children, depth + 1)}`;
      }
      if (node.status === 'untouched') {
        return `${indent}  ${node.name}: ${iter(node.value, depth + 1)}`;
      }
      if (node.status === 'removed') {
        return `${indent}- ${node.name}: ${iter(node.value, depth + 1)}`;
      }
      if (node.status === 'added') {
        return `${indent}+ ${node.name}: ${iter(node.value, depth + 1)}`;
      }
      return [
        `${indent}- ${node.name}: ${iter(node.beforeValue, depth + 1)}`,
        `${indent}+ ${node.name}: ${iter(node.value, depth + 1)}`,
      ].join('\n');
    };
    // recursive case: currentValue is an array of nodes.
    const lines = currentValue.map((node) => generateLine(node));
    const styled = ['{', ...lines, `${bracketindent}}`].join('\n');
    return styled;
  };
  const result = iter(diff, 1);
  return result;
};

export default stylish;
