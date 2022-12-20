import { test, expect } from '@jest/globals';
import url from 'url';
import path from 'path';
import { readFile } from '../src/utilities.js';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('compare flat JSON files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expectedResult = readFile(getFixturePath('expected_json_file.txt'));

  expect(genDiff(filepath1, filepath2)).toEqual(expectedResult);
});

test('compare flat YAML files', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const expectedResult = readFile(getFixturePath('expected_yaml_file.txt'));

  expect(genDiff(filepath1, filepath2)).toEqual(expectedResult);
});
