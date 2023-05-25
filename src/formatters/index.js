import stylish from './stylish.js';
import plain from './plain.js';

const getFormattedTree = (ASTtree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(ASTtree);
    case 'plain':
      return plain(ASTtree);
    case 'json':
      return JSON.stringify(ASTtree);
    default:
      throw new Error(`Unknown format '${formatName}'`);
  }
};

export default getFormattedTree;
