# `mold`

> TODO: description

## Usage

```js
import { S, C, P, Normalizer, Circular } from '@produck/mold';
/**
 * S = Simplex { Object, Array, Tuple, Value }
 * C = Compound { Not, And, Or, If }
 * P = Preset { Constant, Enum, Null, NotNull, Instance, Number, String, ... }
 */

const Object = S.Object({
	c: P.Constant(1),
	a: S.Object({
		b: P.String('foo'),
		c: P.Boolean(true)
	}),
	l: S.Array(S.Object({
		s: P.String('')
	})),
	d: S.Object({}),
	e: P.OrNull(P.Symbol()),
	route: Circular(schema => S.Object({
		name: P.String(),
		next: schema,
		previous: schema
	})),
	D: P.Instance(Date),
	point: S.Tuple([P.Number(0), P.Number(0), P.String('baz')]),
	port: P.Port(80),
	p: P.StringPattern(/[a-f0-9]+/)('9f'),
	l: P.StringLength(5)('33333'),
	m5: P.IntegerMultipleOf(5)(10)
});

const normalize = Normalizer(Object);

try {
	const finalOptions = normalize({
		c: 1,
		route: {
			name: 'a',
			next: {
				name: 'b',
				previous: null,
				next: {
				}
			},
			previous: null
		},
		e: null,
		D: new Date(),
		point: [0],
	});

	console.log(finalOptions);
} catch (error) {
	console.log(error);
}
```

## Base
* Schema

## Native
* ObjectSchema
* ArraySchema
* TupleSchema
* ValueSchema

## Proxy
* CustomSchema
* CircularSchema
* NotSchema
* AndSchema
* OrSchema
* BranchSchema

## Preset

## Normalizer