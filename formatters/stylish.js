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
      const {
        key,
        type,
        value,
        children,
      } = keyData;
      const indent = getIndent(depth, 2);

      switch (type) {
        case 'added':
          return `${indent}+ ${key}: ${getStringifyValue(value, depth)}`;
        case 'removed':
          return `${indent}- ${key}: ${getStringifyValue(value, depth)}`;
        case 'updated':
          return `${indent}- ${key}: ${getStringifyValue(value[0], depth)}\n${indent}+ ${key}: ${getStringifyValue(value[1], depth)}`;
        case 'nested':
          return `${indent}  ${key}: ${iter(children, depth + 1)}`;
        default:
          return `${indent}  ${key}: ${getStringifyValue(value, depth)}`;
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
