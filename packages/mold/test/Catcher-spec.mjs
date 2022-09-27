import assert from 'node:assert';
import { describe, it } from 'mocha';
import { Catcher, Normalizer, P, S } from '../src/index.mjs';

describe('Catcher::Simple', function () {
	it('should throw if bad options.', function () {
		const schema = S.Object({
			foo: S.Array(S.Object({
				bar: S.Tuple([P.Number(), () => {
					throw new Error('baz');
				}])
			}))
		});

		const normalize = Normalizer(schema, Catcher.Simple);

		assert.throws(() => normalize({ foo: [{ bar: [1, null] }] }), {
			name: 'TypeError',
			message: 'Invalid ".foo[0].bar<1>", one "unknown" expected.\nError: baz'
		});

		assert.throws(() => normalize({ foo: [{ bar: [true] }] }), {
			name: 'TypeError',
			message: 'Invalid ".foo[0].bar<0>", one required "number" expected.'
		});
	});
});