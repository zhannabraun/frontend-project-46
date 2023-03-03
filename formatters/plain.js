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
      .filter((keyData) => (keyData.status !== 'unchanged'))
      .map((keyData) => {
        const { key, status, value, modyfiedValue } = keyData;
        const newKey = (currentKey !== '') ? `${currentKey}.${key}` : key;
        const newValue = getFormattedValue(value);
        const newModyfiedValue = getFormattedValue(modyfiedValue);

        switch (status) {
          case 'added':
            return `Property '${newKey}' was added with value: ${newValue}`;
          case 'removed':
            return `Property '${newKey}' was removed`;
          case 'flat & modyfied':
            return `Property '${newKey}' was updated. From ${newValue} to ${newModyfiedValue}`;
          default:
            return iter(value, newKey);
        }
      });

    return lines.join('\n');
  };

  return iter(ASTtree);
};

export default plain;
