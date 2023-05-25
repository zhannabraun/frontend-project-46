import _ from 'lodash';

const getFormattedValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (ASTtree) => {
  const iter = (currentValue, currentKey = '') => {
    const lines = currentValue
      .filter((keyData) => (keyData.type !== 'unchanged'))
      .map((keyData) => {
        const { key, type, value } = keyData;
        const newKey = (currentKey !== '') ? `${currentKey}.${key}` : key;

        switch (type) {
          case 'added':
            return `Property '${newKey}' was added with value: ${getFormattedValue(value)}`;
          case 'removed':
            return `Property '${newKey}' was removed`;
          case 'changed':
            return `Property '${newKey}' was updated. From ${getFormattedValue(value[0])} to ${getFormattedValue(value[1])}`;
          default:
            return iter(keyData.children, newKey);
        }
      });

    return lines.join('\n');
  };

  return iter(ASTtree);
};

export default plain;
