import url from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import expectedResult from '../__fixtures__/expected_file.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('compare flat JSON-files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2)).toEqual(expectedResult);
});
