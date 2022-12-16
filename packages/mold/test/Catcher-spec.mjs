import assert from 'node:assert';
import { Catcher, Normalizer, P, S } from '../src/index.mjs';

describe('Catcher::Simple', function () {
	it('should throw if bad options.', function () {
		const schema = S.Object({
			foo: S.Array({
				minLength: 0,
				maxLength: 2,
				items: S.Object({
					bar: S.Tuple([P.Number(), (_, _empty) => {
						if (!_empty) {
							throw new Error('baz');
						}
					}]),
				}),
				key: (item) => item.bar[0],
			}),
		});

		const normalize = Normalizer(schema, Catcher.Simple);

		assert.throws(() => normalize({ foo: [{ bar: [1, null] }] }), {
			name: 'TypeError',
			message: 'Invalid ".foo[0].bar<1>", one "unknown" expected.\nError: baz',
		});

		assert.throws(() => normalize({ foo: [{ bar: [true] }] }), {
			name: 'TypeError',
			message: 'Invalid ".foo[0].bar<0>", one required "number" expected.',
		});

		assert.throws(() => normalize({ foo: [null, null, null] }), {
			name: 'TypeError',
			message: 'Invalid ".foo", one "array" expected.\nLength should be [0, 2]',
		});

		assert.throws(() => normalize({ foo: [{ bar: [1] }, { bar: [1] }] }), {
			name: 'TypeError',
			message: 'Invalid ".foo", one "array" expected.\nThe element at [1] is duplicated.',
		});
	});
});
