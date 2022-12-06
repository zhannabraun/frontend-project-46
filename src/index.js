import fs from 'fs';
import path from 'path';
import compareData from './utilities.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const data2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  const result = compareData(data1, data2);

  return result;
};

export default genDiff;
