import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const format = (diff, formatname = 'stylish') => {
  if (formatname === 'plain') {
    return plain(diff);
  }
  if (formatname === 'json') {
    return json(diff);
  }
  return stylish(diff);
};

export default format;
