import assert from 'node:assert';
import { Normalizer, Circular, Custom, Catcher } from '../src/index.mjs';

describe('Normalizer::', function () {
	it('should throw if bad schema.', function () {
		assert.throws(() => Normalizer(), {
			name: 'TypeError',
			message: 'Invalid "schema", one "function" expected.'
		});
	});

	it('should throw if bad catcher.', function () {
		assert.throws(() => Normalizer(() => {}, null), {
			name: 'TypeError',
			message: 'Invalid "caught", one "function" expected.'
		});
	});

	describe('normalize::', function () {
		it('should get default value.', function () {
			const normalize = Normalizer(() => 'foo', () => {});

			assert.strictEqual(normalize(), 'foo');
		});

		it('should throw if bad value.', function () {
			let flag = false;

			const normalize = Normalizer(() => {
				throw 'foo';
			}, error => {
				assert.strictEqual(error, 'foo');
				flag = true;
			});

			normalize();
			assert.strictEqual(flag, true);
		});

		it('should throw if catcher = Throw', function () {
			const normalize = Normalizer(() => {
				throw 'foo';
			}, Catcher.Throw);

			assert.throws(() => normalize());
		});
	});
});

describe('Circular::', function () {
	it('should throw if bad proxy.', function () {
		assert.throws(() => Circular(), {
			name: 'TypeError',
			message: 'Invalid "proxy", one "function" expected.'
		});
	});

	it('should throw if bad proxy() returns.', function () {
		assert.throws(() => Circular(() => null), {
			name: 'TypeError',
			message: 'Invalid "referenced schema", one "function" expected.'
		});
	});

	it('should create a circular schema.', function () {
		Circular(() => () => {});
	});

	describe('schema::', function () {
		it('should call reference schema.', function () {
			let flag = false;

			Circular((ref) => () => {
				if (flag) {
					return;
				}

				flag = true;
				ref();
			})();

			assert.strictEqual(flag, true);
		});
	});
});

describe('Custom::', function () {
	it('should throw if bad schema.', function () {
		assert.throws(() => Custom(), {
			name: 'TypeError',
			message: 'Invalid "schema", one "function" expected.'
		});
	});

	it('should throw if bad proxy.', function () {
		assert.throws(() => Custom(() => {}, null), {
			name: 'TypeError',
			message: 'Invalid "proxy", one "function" expected.'
		});
	});

	it('should create a custom schema.', function () {
		Custom(() => {});
		Custom(() => {}, () => {});
	});

	describe('schema::', function () {
		it('should default to get a default value.', function () {
			const schema = Custom(() => true);

			assert.strictEqual(schema(undefined, true), true);
		});

		it('should catch in proxy.', function () {
			let flag = false;

			const schema = Custom(() => {
				throw 'foo';
			}, (_value, _empty, next) => {
				try {
					return next();
				} catch (error) {
					flag = true;
					assert.strictEqual(error, 'foo');

					return 'bar';
				}
			});

			assert.strictEqual(schema(), 'bar');
			assert.strictEqual(flag, true);
		});
	});
});