import { S, C, P, Normalizer, Circular, PROPERTY } from '@produck/mold';

const Object = S.Object({
	c: P.Constant(1),
	y: P.Any(null),
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
		next: P.OrNull(schema),
		previous: P.OrNull(schema)
	})),
	D: P.Instance(Date),
	point: S.Tuple([P.Number(0), P.Number(0), P.String('baz')]),
	port: P.Port(80),
	p: P.StringPattern(/[a-f0-9]+/)('9f'),
	l: P.StringLength(5)('33333'),
	m5: P.IntegerMultipleOf(5)(10),
	n: P.Null(true),
});

const test = S.Array({
	items: P.String(),
	key: (item, index) => item
});

test()[0]

const normalize = Normalizer(Object);

try {
	const finalOptions = normalize({
		c: 1,
		route: {
			name: 'a',
			next: {
				name: 'b',
				previous: null,
				next: null
			},
			previous: null
		},
		e: null,
		D: new Date(),
		point: [0],
		n: null
	});

	console.log(finalOptions);
} catch (error) {
	console.log(error);
}
