# @produck/mold
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/produck/mold/Node.js%20CI)](https://github.com/produck/mold/actions/workflows/node.js.yml)
[![Coveralls](https://img.shields.io/coveralls/github/produck/mold)](https://coveralls.io/github/produck/mold)
[![npm (scoped)](https://img.shields.io/npm/v/@produck/mold)](https://www.npmjs.com/package/@produck/mold)
[![npm](https://img.shields.io/npm/dw/@produck/koa-forker)](https://www.npmjs.com/package/@produck/mold)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=flat-square)](https://lerna.js.org/)
[![NPM](https://img.shields.io/npm/l/@produck/mold)](https://opensource.org/licenses/MIT)

A tool module for defining data type schemas to a normalize function. It has been published as a "Dual CommonJS/ES module [[1]](https://nodejs.org/dist/latest-v16.x/docs/api/packages.html#dual-commonjses-module-packages)" package. It is very simple, flexible. There is also some default "Catcher" for helping to throw a "TypeError" with good readability messages. It can work in "node.js" and browsers.

## Installation
```
$ npm install @produck/mold
```

## Examples
The "options" in fs.appendFile(path, data[, options], callback),
```js
import { S, C, P, Normalizer } from '@produck/mold';

const flags = [
	'a', 'ax', 'a+', 'ax+', 'as', 'as+',
	'r', 'r+', 'rs+',
	'w', 'wx', 'w+', 'wx+'
];

const schema = S.Object({
	encoding: P.OrNull(P.String('utf-8')),
	mode: P.Integer(0o666),
	flag: P.Enum(flags);
});

const normalize = Normalizer(schema);

normalize(); // ok
normalize({ encoding: 'utf-8' }); // ok
normalize({ encoding: 123 }); // throws
normalize({ flag: 'f' }); // throws
```

## Usage

### Creating a normalize() from schema

### Custom Simplex Value Schema
```js
import { Simplex } from '@produck/mold';
import net from 'node:net';

// A optional schema.
const IPv4 = Simplex.Value(net.isIPv4, 'IP string', () => '0.0.0.0');

// A required schmea
const IPv4 = Simplex.Value(net.isIPv4, 'IP string');
```
### Circular Schema

### Custom Proxy Schema

## API by Levels
### L0 - Manual Functions as Schemas
```js
const l0 = (_value, _empty) => {
	// Some statement...
}
```

### L1 - Simplex Schemas
```js
import { S, Simp, Simplex } from '@produck/mold';

Simplex.Value();
Simplex.Object();
Simplex.Array();
Simplex.Tuple();
```

### L2 - Compound Schemas
```js
import { C, Comp, Compound } from '@produck/mold';

Compound.Not();
Compound.And();
Compound.Or();
Compound.If();
```

### L3 - Special Proxy Schemas
```js
import { Circular, Custom } from '@produck/mold';

Circular();
Custom();
```

### L4 - Preset Schemas & Schema Providers
```js
import { P, Pre, Preset } from '@produck/mold';

Preset.Constant();
Preset.Enum();
Preset.Null;
Preset.NotNull;
Preset.Instance();
Preset.OrNull();
Preset.Number();
...
```

## License
[MIT](https://github.com/produck/mold/blob/main/LICENSE)