import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parseYaml = (pathfile) => yaml.load(fs.readFileSync(pathfile));

const parseJson = (pathfile) => JSON.parse(fs.readFileSync(pathfile));

// =============================================================
// а эта штука сама определит тип файла и запарсит

const parseFile = (pathfile) => {
  const extname = path.extname(pathfile);
  if (extname === '.json') {
    return parseJson(pathfile);
  }
  if (extname === '.yml') {
    return parseYaml(pathfile);
  }
  return 'Unsupported file format';
};

export {
  parseYaml,
  parseJson,
  parseFile,
};
