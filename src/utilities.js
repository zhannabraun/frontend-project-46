import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const getExtension = (filepath) => path.extname(filepath);

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const buildKeyData = (key, status, value, modyfiedValue = '') => (
  { key, status, value, modyfiedValue }
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
      return buildKeyData(key, 'deleted', value1);
    }

    if (!_.isEqual(value1, value2)) {
      return _.isObject(value1) && _.isObject(value2)
        ? buildKeyData(key, 'nested & modyfied', buildASTtree(value1, value2))
        : buildKeyData(key, 'flat & modyfied', value1, value2);
    }

    return buildKeyData(key, 'unchanged', value1);
  });
};

const getIndent = (depth, extraSpace = 0) => ' '.repeat((depth * 4) - extraSpace);

const stringify = (value, depth) => {
  const iter = (currentValue, innerDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${getIndent(innerDepth + 1)}${key}: ${iter(val, innerDepth + 1)}`);

    return [
      '{',
      ...lines,
      `${getIndent(innerDepth)}}`,
    ].join('\n');
  };

  return iter(value, depth);
};

export { getExtension, readFile, buildASTtree, getIndent, stringify };
