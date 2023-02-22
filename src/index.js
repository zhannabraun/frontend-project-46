import path from 'path';
import parse from './parsers.js';
import { buildASTtree } from './utilities.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(path.resolve(filepath1));
  const data2 = parse(path.resolve(filepath2));

  return buildASTtree(data1, data2);
};

export default genDiff;
