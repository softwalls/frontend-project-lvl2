#!/usr/bin/env node

import program from 'commander';
// eslint-disable-next-line import/extensions
import genDiff from '../index.js';

const getFormat = () => {
  const options = program.opts();
  return options.format;
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'tree')
  .action((filepath1, filepath2) => {
    const styledDiff = genDiff(filepath1, filepath2, getFormat());
    console.log(styledDiff);
  });

program.parse(process.argv);
