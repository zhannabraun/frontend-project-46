import stylish from './stylish.js';
import plain from './plain.js';

const getFormattedTree = (ASTtree, formatName) => {
  if (formatName === 'stylish') {
    return stylish(ASTtree);
  }

  if (formatName === 'plain') {
    return plain(ASTtree);
  }

  throw new Error(`Unknown format '${formatName}'`);
};

export default getFormattedTree;
