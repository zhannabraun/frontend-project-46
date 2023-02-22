import YAML from 'yamljs';
import { getExtension, readFile } from './utilities.js';

const parse = (filepath) => {
  const extension = getExtension(filepath);
  if (extension === '.yaml' || extension === '.yml') {
    return YAML.parse(readFile(filepath));
  }

  return JSON.parse(readFile(filepath));
};

export default parse;
