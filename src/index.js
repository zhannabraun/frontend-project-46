import path from 'path';
import getFormattedTree from './formatters/index.js';
import parse from './parsers.js';
import { readFile, buildASTtree } from './utilities.js';

const getData = (filepath) => readFile(path.resolve(filepath));
const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(getData(filepath1), getFileFormat(filepath1));
  const data2 = parse(getData(filepath2), getFileFormat(filepath2));
  const diff = buildASTtree(data1, data2);

  return getFormattedTree(diff, formatName);
};

export default genDiff;
