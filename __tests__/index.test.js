import { test, expect, describe, beforeAll } from '@jest/globals';
import url from 'url';
import path from 'path';
import { readFile } from '../src/utilities.js';
import genDiff from '../src/index.js';
import stylish from '../src/formatters.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let filepathJSON1;
let filepathJSON2;
let filepathYAML1;
let filepathYAML2;
let expectedResult;

beforeAll(() => {
  filepathJSON1 = getFixturePath('file1.json');
  filepathJSON2 = getFixturePath('file2.json');
  filepathYAML1 = getFixturePath('file1.yml');
  filepathYAML2 = getFixturePath('file2.yml');
  expectedResult = readFile(getFixturePath('result_stylish.txt'));
});

describe("'stylish' formatter", () => {
  test('compare JSON files', () => {
    expect(stylish(genDiff(filepathJSON1, filepathJSON2))).toEqual(expectedResult);
  });

  test('compare YAML files', () => {
    expect(stylish(genDiff(filepathYAML1, filepathYAML2))).toEqual(expectedResult);
  });
});
