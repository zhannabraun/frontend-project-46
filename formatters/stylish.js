import _ from 'lodash';

const getIndent = (depth, extraSpace = 0) => ' '.repeat((depth * 4) - extraSpace);

const getStringifyValue = (value, depth) => {
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

const stylish = (ASTtree) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map((keyData) => {
      const { key, status, value, modyfiedValue } = keyData;
      const stringifyValue = getStringifyValue(value, depth);
      const stringifyModyfiedValue = getStringifyValue(modyfiedValue, depth);
      const indent = getIndent(depth, 2);

      switch (status) {
        case 'added':
          return `${indent}+ ${key}: ${stringifyValue}`;
        case 'removed':
          return `${indent}- ${key}: ${stringifyValue}`;
        case 'flat & modyfied':
          return `${indent}- ${key}: ${stringifyValue}\n${indent}+ ${key}: ${stringifyModyfiedValue}`;
        case 'nested & modyfied':
          return `${indent}  ${key}: ${iter(value, depth + 1)}`;
        default:
          return `${indent}  ${key}: ${stringifyValue}`;
      }
    });

    return [
      '{',
      ...lines,
      `${getIndent(depth, 4)}}`,
    ].join('\n');
  };

  return iter(ASTtree, 1);
};

export default stylish;
