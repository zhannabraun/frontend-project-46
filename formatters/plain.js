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
        const {
          key, type, value, children,
        } = keyData;
        const newKey = (currentKey !== '') ? `${currentKey}.${key}` : key;
        const mainText = `Property '${newKey}' was ${type}`;

        switch (type) {
          case 'added':
            return `${mainText} with value: ${getFormattedValue(value)}`;
          case 'removed':
            return `${mainText}`;
          case 'updated':
            return `${mainText}. From ${getFormattedValue(value[0])} to ${getFormattedValue(value[1])}`;
          default:
            return iter(children, newKey);
        }
      });

    return lines.join('\n');
  };

  return iter(ASTtree);
};

export default plain;
