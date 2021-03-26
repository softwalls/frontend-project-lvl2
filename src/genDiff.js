import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { parseFile } from './parsers.js';
import buildAst from './buildAst.js';
import stylish from './stylish.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getJson = (filepath) => {
  const rawJson = readFileSync(getFixturePath(`${filepath}`));
  const result = JSON.parse(rawJson);
  return result;
};

// ======================= GENDIFF =================================================

const genDiff = (filepath1, filepath2, formatname) => {
  const getAbcoluteFilePath = (somePath) => path.resolve(process.cwd(), somePath);
  // прочитаем файлы

  const file1 = parseFile(getAbcoluteFilePath(filepath1));
  const file2 = parseFile(getAbcoluteFilePath(filepath2));
  const diff = buildAst(file1, file2);
  if (formatname === 'tree') {
    return stylish(diff);
  }
  return diff;
};

// =================================================================================

export {
  genDiff,
  getJson,
};
