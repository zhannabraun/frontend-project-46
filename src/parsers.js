import YAML from 'yamljs';

const parse = (data, fileFormat) => {
  if (fileFormat === 'yaml' || fileFormat === 'yml') {
    return YAML.parse(data);
  }

  return JSON.parse(data);
};

export default parse;
