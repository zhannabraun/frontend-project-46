import path from 'path';
import parsing from './parsers.js';
import { compareData } from './utilities.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parsing(path.resolve(filepath1));
  const data2 = parsing(path.resolve(filepath2));

  return compareData(data1, data2);
};

export default genDiff;
