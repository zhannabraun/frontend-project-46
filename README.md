# GenDiff

[![Actions Status](https://github.com/zhannabraun/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/zhannabraun/frontend-project-46/actions)
[![Node CI](https://github.com/zhannabraun/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/zhannabraun/frontend-project-46/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/ccd0b09182f651700d06/maintainability)](https://codeclimate.com/github/zhannabraun/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ccd0b09182f651700d06/test_coverage)](https://codeclimate.com/github/zhannabraun/frontend-project-46/test_coverage)

'GenDiff' is a file difference generator. This is a CLI app that compares two configuration files and shows the difference. The difference can be displayed in three formats: 'stylish', 'plain' or 'json'. Supported configuration files formats - JSON (.json) and YAML (.yaml or .yml).

### Installation

```bash
$ git clone git@github.com:zhannabraun/frontend-project-46.git
cd frontend-project-46
$ make install
$ sudo npm link
```

### Usage

```bash
$ gendiff [options] <filepath1> <filepath2>
```

You can choose one of three output formats ('stylish', 'plain' or 'json') with the option ```-f``` or ```--format```, for example:

```bash
$ gendiff -f stylish <filepath1> <filepath2>
```

You can also run GenDiff with the option ```-h``` or ```--help``` for output usage information.

### Formats
#### 'Stylish' format

This is the default format.

```bash
$ gendiff -f stylish path/to/file1.json path/to/file2.json
```
```bash
$ gendiff path/to/file1.json path/to/file2.json
```

<a href="https://asciinema.org/a/XlmmHsZ3YDDQ3kZnEWpXVMiJF" target="_blank"><img src="https://asciinema.org/a/XlmmHsZ3YDDQ3kZnEWpXVMiJF.svg" width="540"/></a>

##### Output example:
```
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```


#### 'Plain' format

```bash
$ gendiff -f plain path/to/file1.json path/to/file2.json
```

<a href="https://asciinema.org/a/0MFsT1QOCWaXU2E6WkGChW27O" target="_blank"><img src="https://asciinema.org/a/0MFsT1QOCWaXU2E6WkGChW27O.svg" width="540"/></a>

##### Output example:
```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```


#### 'Json' format

```bash
$ gendiff -f json path/to/file1.json path/to/file2.json
```

<a href="https://asciinema.org/a/MeRbu7T8FifW8ZNbvCLYcZXSH" target="_blank"><img src="https://asciinema.org/a/MeRbu7T8FifW8ZNbvCLYcZXSH.svg" width="540"/></a>

##### Output example:
```
[{"key":"common","type":"nested","children":[{"key":"follow","type":"added","value":false},{"key":"setting1","type":"unchanged","value":"Value 1"},{"key":"setting2","type":"removed","value":200},{"key":"setting3","type":"updated","from":true,"to":null},{"key":"setting4","type":"added","value":"blah blah"},{"key":"setting5","type":"added","value":{"key5":"value5"}},{"key":"setting6","type":"nested","children":[{"key":"doge","type":"nested","children":[{"key":"wow","type":"updated","from":"","to":"so much"}]},{"key":"key","type":"unchanged","value":"value"},{"key":"ops","type":"added","value":"vops"}]}]},{"key":"group1","type":"nested","children":[{"key":"baz","type":"updated","from":"bas","to":"bars"},{"key":"foo","type":"unchanged","value":"bar"},{"key":"nest","type":"updated","from":{"key":"value"},"to":"str"}]},{"key":"group2","type":"removed","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","type":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]
```