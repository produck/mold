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

	});

	describe('ObjectSchema::', function () {

	});

	describe('ArraySchema::', function () {

	});

	describe('TupleSchema::', function () {

	});
});