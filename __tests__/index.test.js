import { test, expect, describe, beforeAll } from '@jest/globals';
import url from 'url';
import path from 'path';
import { readFile } from '../src/utilities.js';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let filepathJSON1;
let filepathJSON2;
let filepathYAML1;
let filepathYAML2;
let resultStylish;
let resultPlain;

beforeAll(() => {
  filepathJSON1 = getFixturePath('file1.json');
  filepathJSON2 = getFixturePath('file2.json');
  filepathYAML1 = getFixturePath('file1.yml');
  filepathYAML2 = getFixturePath('file2.yml');
  resultStylish = readFile(getFixturePath('result_stylish.txt'));
  resultPlain = readFile(getFixturePath('result_plain.txt'));
});

describe("'stylish' formatter", () => {
  test('compare JSON files', () => {
    expect(genDiff(filepathJSON1, filepathJSON2, 'stylish')).toEqual(resultStylish);
  });

  test('compare YAML files', () => {
    expect(genDiff(filepathYAML1, filepathYAML2, 'stylish')).toEqual(resultStylish);
  });
});

describe("'plain' formatter", () => {
  test('compare JSON files', () => {
    expect(genDiff(filepathJSON1, filepathJSON2, 'plain')).toEqual(resultPlain);
  });

  test('compare YAML files', () => {
    expect(genDiff(filepathYAML1, filepathYAML2, 'plain')).toEqual(resultPlain);
  });
});

describe('Unknown format', () => {
  test('compare JSON files', () => {
    expect(genDiff(filepathJSON1, filepathJSON2, 'plain')).toEqual(resultPlain);
  });

  test('compare YAML files', () => {
    expect(genDiff(filepathYAML1, filepathYAML2, 'plain')).toEqual(resultPlain);
  });
});
