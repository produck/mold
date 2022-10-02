import assert from 'node:assert';
import { describe, it } from 'mocha';
import { Simplex } from '../src/index.mjs';
import { OptionsParser } from '../src/Simplex/OptionsParser.mjs';

describe('Simplex::', function () {
	describe('SimplexSchema::', function () {
		it('should create a specific schema by normalize.', function () {
			const schema = Simplex.Schema(() => 'foo', 'foo', false);
			const value = schema(undefined, true);

			assert.strictEqual(value, 'foo');
		});

		it('should create a custom expected schema.', function () {
			const schema = Simplex.Schema(() => false, 'bar', true);

			try {
				schema(null, true);
			} catch (error) {
				assert.strict(error.detail.expected, 'bar');
			}
		});

		it('should create a required schema', function () {
			const schema = Simplex.Schema(() => false, 'bar', true);

			try {
				schema(null, true);
			} catch (error) {
				assert.strict(error.detail.required, true);
			}
		});

		it('should throw if bad normalize.', function () {
			assert.throws(() => Simplex.Schema(null), {
				name: 'TypeError',
				message: 'Invalid "normalize", one "function" expected.'
			});
		});

		it('should throw if bad expected.', function () {
			assert.throws(() => Simplex.Schema(() => {}, null), {
				name: 'TypeError',
				message: 'Invalid "expected", one "string" expected.'
			});
		});

		it('should throw if bad required.', function () {
			assert.throws(() => Simplex.Schema(() => {}, '', null), {
				name: 'TypeError',
				message: 'Invalid "required", one "boolean" expected.'
			});
		});

		it('should throw if bad _empty', function () {
			const schema = Simplex.Schema(() => false, 'bar', true);

			assert.throws(() => schema(null, null), {
				name: 'TypeError',
				message: 'Invalid "_empty", one "boolean" expected.'
			});
		});
	});

	describe('OptionsParser()', function () {
		it('should create a parser.', function () {
			OptionsParser();
			OptionsParser('abc');
			OptionsParser('abc', null);
		});

		describe('::parser', function () {
			it('should be [expected, DefaultValue].', function () {
				const parser = OptionsParser();
				const options = parser(['foo', null]);

				assert.strictEqual(options.expected, 'foo');
				assert.strictEqual(options.DefaultValue, null);
			});

			it('should be [expected].', function () {
				const parser = OptionsParser();
				const options = parser(['foo']);

				assert.strictEqual(options.expected, 'foo');
				assert.strictEqual(options.DefaultValue, null);
			});

			it('should be [DefaultValue].', function () {
				const parser = OptionsParser();
				const options = parser([null]);

				assert.strictEqual(options.expected, 'valid value');
				assert.strictEqual(options.DefaultValue, null);
			});

			it('should be [].', function () {
				const parser = OptionsParser();
				const options = parser([null]);

				assert.strictEqual(options.expected, 'valid value');
				assert.strictEqual(options.DefaultValue, null);
			});

			it('should throw if bad arguments.', function () {
				const parser = OptionsParser();

				assert.throws(() => parser([null, null, null]),	 {
					name: 'TypeError',
					message: 'Invalid "options", one "tuple(length<=2)" expected.'
				});
			});

			it('should throw if bad expected', function () {
				const parser = OptionsParser();

				assert.throws(() => parser([1]),	{
					name: 'TypeError',
					message: 'Invalid "options<0>", one "string or function or null" expected.'
				});

				assert.throws(() => parser([1, null]),	{
					name: 'TypeError',
					message: 'Invalid "options<0>", one "string" expected.'
				});
			});

			it('should throw if bad DefaultValue', function () {
				const parser = OptionsParser();

				assert.throws(() => parser(['1', 1]),	{
					name: 'TypeError',
					message: 'Invalid "options<1>", one "function or null" expected.'
				});
			});

			describe('::options.toSchemaArgs()', function () {
				it('should be [expected, required].', function () {
					const parser = OptionsParser();

					assert.deepStrictEqual(parser([]).toSchemaArgs(), ['valid value', true]);
				});
			});
		});
	});

	describe('ValueSchema::', function () {
		it('should throw if bad validate.', function () {
			assert.throws(() => Simplex.Value(), {
				name: 'TypeError',
				message: 'Invalid "validate", one "function" expected.'
			});
		});

		describe('schema::', function () {
			it('should create a required schema.', function () {
				const foo = Simplex.Value(() => true, 'bar');
				const value = foo('baz', false);

				assert.strictEqual(value, 'baz');
				assert.throws(() => foo(undefined, true));
			});

			it('should create a optional schema.', function () {
				const foo = Simplex.Value(() => true, 'bar', () => 'baz');
				const value = foo(undefined, true);

				assert.strictEqual(value, 'baz');
			});

			it('should throw if not validated.', function () {
				const foo = Simplex.Value(() => false, 'bar', () => 'baz');

				assert.throws(() => foo(null, false));
			});
		});
	});

	describe('ObjectSchema::', function () {
		it('should create an object schema.', function () {
			Simplex.Object();
		});

		it('should throw if bad schemaMap.', function () {
			assert.throws(() => Simplex.Object(null), {
				name: 'TypeError',
				message: 'Invalid "schemaMap", one "plain object" expected.'
			});
		});

		it('should throw if bad schema in schemaMap', function () {
			assert.throws(() => Simplex.Object({ a: null }), {
				name: 'TypeError',
				message: 'Invalid "schemaMap["a"]", one "function" expected.'
			});
		});

		describe('schema::', function () {
			it('should throw if bad _value.', function () {
				const schema = Simplex.Object();

				assert.throws(() => schema());
			});

			it('should get a default object.', function () {
				const schema = Simplex.Object();

				assert.deepStrictEqual(schema(undefined, true), {});
			});

			it('should get an object with default property.', function () {
				const schema = Simplex.Object({ foo: () => 'bar' });

				assert.deepStrictEqual(schema(undefined, true), { foo: 'bar' });
			});

			it('should throw if bad property.', function () {
				const schema = Simplex.Object({
					foo: () => {
						throw new Error('bar');
					}
				});

				assert.throws(() => schema({}));
			});
		});
	});

	describe('ArraySchema::', function () {
		it('should throw if bad options.', function () {
			assert.throws(() => Simplex.Array(null), {
				name: 'TypeError',
				message: 'Invalid "options", one "function or object" expected.'
			});
		});

		it('should throw if bad options.items', function () {
			assert.throws(() => Simplex.Array({ items: null }), {
				name: 'TypeError',
				message: 'Invalid ".items", one "function" expected.'
			});
		});

		it('should throw if bad options.minLength', function () {
			const expected = {
				name: 'TypeError',
				message: 'Invalid ".minLength", one "integer >= 0" expected.'
			};

			assert.throws(() => Simplex.Array({ minLength: -1 }), expected);
			assert.throws(() => Simplex.Array({ minLength: null }), expected);
		});

		it('should throw if bad options.maxLength', function () {
			const expected = {
				name: 'TypeError',
				message: 'Invalid ".maxLength", one "integer >= minLength" expected.'
			};

			assert.throws(() => Simplex.Array({ maxLength: null }), expected);
			assert.throws(() => Simplex.Array({ minLength: 10, maxLength: 1 }), expected);
		});

		it('should throw if bad options.key', function () {
			const expected = {
				name: 'TypeError',
				message: 'Invalid ".key", one "function" expected.'
			};

			assert.throws(() => Simplex.Array({ key: null }), expected);
		});

		it('should create an array schema.', function () {
			Simplex.Array();
			Simplex.Array(() => {});
			Simplex.Array({});
		});

		describe('schema::', function () {
			it('should get a default [].', function () {
				const schema = Simplex.Array();

				assert.deepStrictEqual(schema(undefined, true), []);
			});

			it('should throw if bad _value', function () {
				const schema = Simplex.Array();

				assert.throws(() => schema(null));
			});

			it('should pass if any item in array.', function () {
				const schema = Simplex.Array();
				const value = [1, true];

				assert.deepStrictEqual(schema(value), [1, true]);
			});

			it('should throw if bad item.', function () {
				const schema = Simplex.Array(() => {
					throw new Error('foo');
				});

				assert.throws(() => schema([1]));
			});

			it('should throw if bad length.', function () {
				const schema = Simplex.Array({
					minLength: 4,
					maxLength: 5
				});

				assert.throws(() => schema([]));
				assert.throws(() => schema([1, 1, 1, 1, 1, 1]));
				assert.deepStrictEqual(schema([1, 1, 1, 1, 1]), [1, 1, 1, 1, 1]);
			});

			it('should throw if duplicated.', function () {
				const schema = Simplex.Array({ key: item => item });

				assert.throws(() => schema([1, 1]));
			});
		});
	});

	describe('TupleSchema::', function () {
		it('should create a default tuple schema.', function () {
			Simplex.Tuple();
		});

		it('should throw if bad schemaList.', function () {
			assert.throws(() => Simplex.Tuple(null), {
				name: 'TypeError',
				message: 'Invalid "schemaList", one "array" expected.'
			});
		});

		it('should throw if a bad schema in schemaList.', function () {
			assert.throws(() => Simplex.Tuple([0]), {
				name: 'TypeError',
				message: 'Invalid "schemaList[0]", one "function" expected.'
			});
		});

		describe('schema::', function () {
			it('should get a default tuple []', function () {
				const schema = Simplex.Tuple();

				assert.deepStrictEqual(schema(undefined, true), []);
			});

			it('should throw if bad _value.', function () {
				const schema = Simplex.Tuple();

				assert.throws(() => schema());
			});

			it('should get a tuple with default value.', function () {
				const schema = Simplex.Tuple([
					() => 'foo',
					() => 1
				]);

				assert.deepStrictEqual(schema([]), ['foo', 1]);
			});

			it('should throw if bad element in tuple', function () {
				const schema = Simplex.Tuple([
					() => {
						throw new Error('foo');
					},
				]);

				assert.throws(() => schema([1]));
			});
		});
	});
});