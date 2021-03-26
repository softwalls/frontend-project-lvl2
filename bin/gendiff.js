#!/usr/bin/env node

import { Command } from 'commander';
// eslint-disable-next-line import/extensions
import genDiff from '../index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => console // eslint-disable-line no-console
    .log(genDiff(filepath1, filepath2)));

program.parse(process.argv);
