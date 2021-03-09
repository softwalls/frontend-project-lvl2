#!/usr/bin/env node

import { Command } from 'commander';
import { genDiff, getJson } from './src/genDiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => console
    .log(genDiff(getJson(filepath1), getJson(filepath2))));

program.parse(process.argv);
console.log(`Current directory: ${process.cwd()}`);
