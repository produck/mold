import assert from 'node:assert';
import { describe, it } from 'mocha';
import { Compound } from '../src/index.mjs';

describe('Compound::', function () {
	describe('Not::', function () {
		it('should create a schema.', function () {
			Compound.Not(() => {});
		});

		it('should throw if bad targetSchema.', function () {
			assert.throws(() => Compound.Not(), {
				name: 'TypeError',
				message: 'Invalid "targetSchema", one "function" expected.'
			});
		});

		describe('schema::', function () {
			it('should get _value.', function () {
				const schema = Compound.Not(() => {
					throw new Error('foo');
				});

				assert.strictEqual(schema('bar'), 'bar');
			});

			it('should throw if match target schema.', function () {
				const schema = Compound.Not(() => {});

				assert.throws(() => schema('bar'));
			});
		});
	});

	describe('And::', function () {
		it('should throw if bad schemaList.', function () {
			assert.throws(() => Compound.And({}), {
				name: 'TypeError',
				message: 'Invalid "schemaList", one "array" expected.'
			});
		});

		it('should throw if bad schema in schemaList.', function () {
			assert.throws(() => Compound.And([null]), {
				name: 'TypeError',
				message: 'Invalid "schemaList[0]", one "function" expected.'
			});
		});

		it('should create a schema.', function () {
			Compound.And();
			Compound.And([() => {}]);
		});

		describe('schema', function () {
			it('should get a default value.', function () {
				const schema = Compound.And([
					any => ({ ...any, foo: 0 }),
					any => ({ ...any, bar: 1 })
				]);

				assert.deepStrictEqual(schema({ baz: null }), {
					baz: null,
					foo: 0,
					bar: 1
				});
			});

			it('should throw if any bad value.', function () {
				const schema = Compound.And([
					any => ({ ...any, foo: 0 }),
					() => { throw new Error('bar'); }
				]);

				assert.throws(() => schema(undefined, true));
			});
		});
	});

	describe('Or::', function () {
		it('should throw if bad schemaList.', function () {
			assert.throws(() => Compound.Or({}), {
				name: 'TypeError',
				message: 'Invalid "schemaList", one "array" expected.'
			});
		});

		it('should throw if bad schema in schemaList.', function () {
			assert.throws(() => Compound.Or([null]), {
				name: 'TypeError',
				message: 'Invalid "schemaList[0]", one "function" expected.'
			});
		});

		it('should create a schema.', function () {
			Compound.Or();
			Compound.Or([() => {}]);
		});

		describe('schema::', function () {
			it('should get a default value.', function () {
				const schema = Compound.Or([
					() => { throw new Error('bar'); },
					any => ({ ...any, foo: 0 }),
				]);

				assert.deepStrictEqual(schema({ baz: null }), { baz: null, foo: 0, });
			});

			it('should throw if any bad value.', function () {
				const schema = Compound.Or([
					() => { throw new Error('foo'); },
					() => { throw new Error('bar'); }
				]);

				assert.throws(() => schema(undefined, true));
			});
		});
	});

	describe('If', function () {
		it('should throw if bad test.', function () {
			assert.throws(() => Compound.If(), {
				name: 'TypeError',
				message: 'Invalid "test", one "function" expected.'
			});
		});

		it('should throw if bad options.', function () {
			assert.throws(() => Compound.If(() => {}), {
				name: 'TypeError',
				message: 'Invalid "options", one "plain object" expected.'
			});
		});

		it('should throw if bad options.then.', function () {
			assert.throws(() => Compound.If(() => {}, {}), {
				name: 'TypeError',
				message: 'Invalid "options.then", one "function" expected.'
			});
		});

		it('should throw if bad options.else.', function () {
			assert.throws(() => Compound.If(() => {}, { then: () => {} }), {
				name: 'TypeError',
				message: 'Invalid "options.else", one "function" expected.'
			});
		});

		it('should create a schema.', function () {
			Compound.If(() => {}, {
				then: () => {},
				else: () => {}
			});
		});

		describe('schema::', function () {
			it('should then.', function () {
				let flag = false;

				const schema = Compound.If(() => {}, {
					then: () => flag = true,
					else: () => {}
				});

				schema();
				assert.strictEqual(flag, true);
			});

			it('should else.', function () {
				let flag = false;

				const schema = Compound.If(() => { throw new Error('foo'); }, {
					then: () => {},
					else: () => flag = true
				});

				schema();
				assert.strictEqual(flag, true);
			});

			it('should throw if not match branch.', function () {
				const schema = Compound.If(() => {}, {
					then: () => { throw new Error('bar'); },
					else: () => {}
				});

				assert.throws(() => schema());
			});
		});
	});
});