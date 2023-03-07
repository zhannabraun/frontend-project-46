import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const getExtension = (filepath) => path.extname(filepath);

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const buildKeyData = (key, type, value) => (
  { key, type, value }
);

const buildASTtree = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return buildKeyData(key, 'added', value2);
    }

    if (!_.has(data2, key)) {
      return buildKeyData(key, 'removed', value1);
    }

    if (!_.isEqual(value1, value2)) {
      return _.isObject(value1) && _.isObject(value2)
        ? { key, type: 'nested', children: buildASTtree(value1, value2) }
        : { key, type: 'updated', value: [value1, value2] };
    }

    return buildKeyData(key, 'unchanged', value1);
  });
};

export { getExtension, readFile, buildASTtree };
