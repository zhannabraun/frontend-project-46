import { getIndent, stringify } from './utilities.js';

const stylish = (ASTtree) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map((keyData) => {
      const { key, status, value, modyfiedValue } = keyData;
      const stringifyValue = stringify(value, depth);
      const stringifyModyfiedValue = stringify(modyfiedValue, depth);
      const indent = getIndent(depth, 2);

      switch (status) {
        case 'added':
          return `${indent}+ ${key}: ${stringifyValue}`;
        case 'deleted':
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
