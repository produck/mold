import { S, C, P, Circular, Custom, Normalizer, Message } from '@produck/mold';

const IdValue = C.Or([P.Number(), P.String('bar')]);
const OptionalPoint = S.Tuple([P.Integer(0), P.Integer(0)]);

const EmploymentAge = C.And([
	P.Integer(0),
	S.Value((any: number) => any > 0 && any <= 60, 'number(0,60]')
]);

const schema = C.And([
	S.Object({
		type: P.Constant('Person'),
		id: C.Or([IdValue, S.Array(IdValue)]),
		name: P.String('foo'),
		tag: P.OrNull(P.Constant('default')),
		origin: Custom(OptionalPoint, (_value, _empty, next) => {
			try {
				console.log(_value, _empty);

				return next();
			} catch (error) {
				console.log(error);

				throw error;
			}
		}),
		age: P.Integer(0),
		routes: Circular(RouteNode => S.Object({
			name: P.String('foo'),
			children: S.Array(RouteNode)
		}))
	}),
	C.If(S.Object({ age: EmploymentAge }), {
		then: S.Object({ working: P.Boolean(true) }),
		else: S.Object({ working: P.Boolean(false) })
	})
]);

const normalize = Normalizer(schema, Message.Origin);

try {
	const finalOptions = normalize({
		type: 'Person',
		id: ['789', 678],
		age: 70,
		tag: 'default',
		routes: {
			name: 'bar',
			children: [
				{
				},
			]
		},
		working: true
	});

	console.log(finalOptions);
} catch (error) {
	console.log(error);
}