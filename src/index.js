import path from 'path';
import getFormattedTree from '../formatters/index.js';
import parse from './parsers.js';
import { buildASTtree } from './utilities.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(path.resolve(filepath1));
  const data2 = parse(path.resolve(filepath2));
  const diff = buildASTtree(data1, data2);

  return getFormattedTree(diff, formatName);
};

export default genDiff;
