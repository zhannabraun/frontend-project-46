#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';
import stylish from '../src/formatters.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    if (options.format === 'stylish') console.log(stylish(genDiff(filepath1, filepath2)));
    else console.log(genDiff(filepath1, filepath2));
  });

program.parse();
