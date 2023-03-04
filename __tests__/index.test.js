import { test, expect, describe } from '@jest/globals';
import url from 'url';
import path from 'path';
import { readFile } from '../src/utilities.js';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe.each`
formatName     | expected
${'stylish'} | ${'result_stylish.txt'}
${'plain'}   | ${'result_plain.txt'}
${'json'}    | ${'result_json.txt'}
`("'$formatName' formatter", ({ formatName, expected }) => {
  test.each`
  file1           | file2
  ${'file1.json'} | ${'file2.json'}
  ${'file1.yml'}  | ${'file2.yml'}
  `('compare $file1 & $file2', ({ file1, file2 }) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    const result = readFile(getFixturePath(expected));

    expect(genDiff(filepath1, filepath2, formatName)).toEqual(result);
  });
});
