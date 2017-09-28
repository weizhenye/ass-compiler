# ass-compiler

[![Build status](https://img.shields.io/travis/weizhenye/ass-compiler.svg)](https://travis-ci.org/weizhenye/ass-compiler)
[![Coverage](https://img.shields.io/codecov/c/github/weizhenye/ass-compiler.svg)](https://codecov.io/gh/weizhenye/ass-compiler)
[![Dependencies](https://img.shields.io/david/weizhenye/ass-compiler.svg)](https://david-dm.org/weizhenye/ass-compiler)
[![NPM version](https://img.shields.io/npm/v/ass-compiler.svg)](https://www.npmjs.com/package/ass-compiler)
[![License](https://img.shields.io/npm/l/ass-compiler.svg)](https://github.com/weizhenye/ass-compiler/blob/master/LICENSE)

Parses and compiles ASS subtitle format to easy-to-use data structure.

[Online Viewer](https://ass.js.org/ass-compiler/)

## Installation

```bash
npm install ass-compiler
```

## Usage

```js
import { parse, compile } from 'ass-compiler';
parse(text);
compile(text);
```

For details of data structure, please use the [online viewer](https://ass.js.org/ass-compiler/).
