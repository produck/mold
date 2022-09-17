import { S, C, P, Normalizer, Circular, Custom, T } from '@produck/mold';

const Object = S.Object({
	c: P.Constant(1),
	a: S.Object({
		b: P.Type.String('foo'),
		c: P.Type.Boolean()
	}),
	l: S.Array(S.Object({
		s: P.Type.String('')
	})),
	d: S.Object(),
	e: P.OrNull(P.Symbol()),
	route: Circular(self => S.Object({
		name: P.Type.String(),
		next: self,
		previous: self
	})),
	C: Custom(S.Object({
		a: P.Null
	}), (_value, _empty, next) => {
		const value = next();

	}),
	D: P.Instance(Date),
	point: S.Tuple([P.Type.Number(0), P.Type.Number(0), P.Type.String()])
});

const And = C.Or([
	S.Object({
		a: P.Type.Number()
	}),
	S.Object({
		b: P.Type.Boolean()
	})
]);

const obj = And();

const normalize = Normalizer(Object, () => {});

const finalOptions = normalize({
	c: 1,
	route: {
		name: 'a',

	},
	D: new Date(),
	point: [0, 0]
});

finalOptions.point

