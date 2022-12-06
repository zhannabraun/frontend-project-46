import _ from 'lodash';

const compareData = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diff = keys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      acc.push(`+ ${key}: ${data2[key]}`);
    } else if (!Object.hasOwn(data2, key)) {
      acc.push(`- ${key}: ${data1[key]}`);
    } else if (data1[key] !== data2[key]) {
      acc.push(`- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`);
    } else {
      acc.push(`  ${key}: ${data1[key]}`);
    }

    return acc;
  }, []);

  return ['{', ...diff].join('\n  ').concat('\n}');
};

export default compareData;
