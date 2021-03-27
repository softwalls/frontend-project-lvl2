import plain from './plain.js';
import stylish from './stylish.js';

const format = (diff, formatname = 'stylish') => {
  if (formatname === 'plain') {
    return plain(diff);
  }
  return stylish(diff);
};

export default format;
