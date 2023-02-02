import assert from 'node:assert';
import { Preset } from '../src/index.mjs';

describe('Undefined()', function () {
	it('should pass', function () {
		assert.strictEqual(Preset.Undefined()(undefined, true), undefined);
		assert.strictEqual(Preset.Undefined(false)(0, true), undefined);
		assert.strictEqual(Preset.Undefined(false)(undefined), undefined);
	});

	it('should throw if bad value', function () {
		assert.throws(() => Preset.Undefined()(0));
	});
});

describe('Any()', function () {
	it('should create a schema.', function () {
		Preset.Any();
		Preset.Any(null);
	});

	it('should throw if bad arguments.', function () {
		assert.throws(() => Preset.Any(1, 2));
	});

	it('should throw if bad value and no defaultValue', function () {
		assert.throws(() => Preset.Any()(undefined, true));
	});

	it('should pass.', function () {
		assert.strictEqual(Preset.Any()(1), 1);
		assert.strictEqual(Preset.Any(null)(1), 1);
		assert.strictEqual(Preset.Any(null)(undefined, true), null);
	});
});

describe('Constant()', function () {
	it('should create a schema.', function () {
		Preset.Constant(1);
	});

	it('should pass.', function () {
		assert.strictEqual(Preset.Constant(1)(1), 1);
	});

	it('should throw if bad value', function () {
		assert.throws(() => Preset.Constant(1)(2));
	});

	it('should throw if bad required.', function () {
		assert.throws(() => Preset.Constant(1, 1), {
			name: 'TypeError',
			message: 'Invalid "required", one "boolean" expected.',
		});
	});
});

describe('Enum()', function () {
	it('should create a schema.', function () {
		Preset.Enum([1, 2]);
		Preset.Enum([1, 2], null);
	});

	it('should throw if bad valueList', function () {
		assert.throws(() => Preset.Enum(null), {
			name: 'TypeError',
			message: 'Invalid "valueList", one "array" expected.',
		});
	});

	it('should throw if empty valueList', function () {
		assert.throws(() => Preset.Enum([]), {
			message: 'There SHOULD be 1 item at least of a valueList.',
		});
	});

	it('should throw if bad defaultIndex.', function () {
		assert.throws(() => Preset.Enum([1], true), {
			name: 'TypeError',
			message: 'Invalid "defaultIndex", one "integer or null" expected.',
		});
	});

	it('should throw if bad defaultIndex not in range.', function () {
		assert.throws(() => Preset.Enum([1], -1), {
			name: 'RangeError',
			message: 'The default index MUST be in [0, 0].',
		});
	});

	it('should pass.', function () {
		assert.strictEqual(Preset.Enum([1, 2])(1), 1);
	});

	it('should throw if bad value', function () {
		assert.throws(() => Preset.Enum([1, 2])(3));
	});
});

describe('Null()', function () {
	it('should pass', function () {
		assert.strictEqual(Preset.Null()(undefined, true), null);
		assert.strictEqual(Preset.Null(false)(undefined, true), null);
		assert.strictEqual(Preset.Null(false)(null), null);
	});

	it('should throw if bad value', function () {
		assert.throws(() => Preset.Null()(1));
	});
});

describe('NotNull()', function () {
	it('should pass', function () {
		assert.strictEqual(Preset.NotNull(1), 1);
	});

	it('should throw if bad value', function () {
		assert.throws(() => Preset.NotNull(null));
	});
});

describe('OrNull()', function () {
	it('should throw if bad schema.', function () {
		assert.throws(() => Preset.OrNull(null), {
			name: 'TypeError',
			message: 'Invalid "schema", one "function" expected.',
		});
	});

	it('should pass', function () {
		const schema = Preset.OrNull(Preset.Constant(1));

		assert.strictEqual(schema(1), 1);
		assert.strictEqual(schema(null), null);
	});

	it('should throw if bad value', function () {
		const schema = Preset.OrNull(Preset.Constant(1));

		assert.throws(() => schema(2));
	});
});

describe('Instance()', function () {
	it('should throw if bad Constructor.', function () {
		assert.throws(() => Preset.Instance(null), {
			name: 'TypeError',
			message: 'Invalid "Constructor", one "class or function" expected.',
		});
	});

	it('should create a schema.', function () {
		Preset.Instance(Date);
	});

	it('should pass', function () {
		const date = new Date();

		assert.strictEqual(Preset.Instance(Date)(date), date);
	});

	it('should throw if bad value.', function () {
		assert.throws(() => Preset.Instance(Date)(1));
	});
});

describe('NativeSchemaProvider::', function () {
	for (const preset of [
		{ Schema: Preset.Number, name: 'Number', value: 1.1 },
		{ Schema: Preset.String, name: 'String', value: 'foo' },
		{ Schema: Preset.Boolean, name: 'Boolean', value: true },
		{ Schema: Preset.Function, name: 'Function', value: () => {} },
		{ Schema: Preset.Symbol, name: 'Symbol', value: Symbol() },
		{ Schema: Preset.Integer, name: 'Integer', value: 2 },
		{ Schema: Preset.BigInt, name: 'BigInt', value: BigInt(0) },
	]) {
		describe(`${preset.name}`, function () {
			it('should create a required schema.', function () {
				preset.Schema();
			});

			it('should create a optional schema.', function () {
				preset.Schema(preset.value);
			});

			it('should throw if bad defaultValue.', function () {
				assert.throws(() => preset.Schema(null), {
					name: 'TypeError',
					message: `Invalid "defaultValue", one "${preset.name.toLowerCase()}" expected.`,
				});
			});

			describe('schema::', function () {
				it('should pass.', function () {
					const schema = preset.Schema(preset.value);

					schema(undefined, true);
					schema(preset.value);
				});

				it('should throw if bad value.', function () {
					const schema = preset.Schema(preset.value);

					assert.throws(() => schema(null));
				});
			});
		});
	}

	describe('NumberRange()', function () {
		it('should throw if bad min.', function () {
			const expected = {
				name: 'TypeError',
				message: 'Invalid "min", one "number or [number]" expected.',
			};

			assert.throws(() => Preset.NumberRange(null), expected);
			assert.throws(() => Preset.NumberRange([]), expected);
			assert.throws(() => Preset.NumberRange([null]), expected);
		});

		it('should throw if bad max.', function () {
			const expected = {
				name: 'TypeError',
				message: 'Invalid "max", one "number or [number]" expected.',
			};

			assert.throws(() => Preset.NumberRange(0, null), expected);
			assert.throws(() => Preset.NumberRange([0], []), expected);
			assert.throws(() => Preset.NumberRange(0, [null]), expected);
		});

		it('shoud throw if min >= max', function () {
			assert.throws(() => Preset.NumberRange(100, 0), {
				message: 'It should be min < max.',
			});
		});

		describe('schema::', function () {
			it('should hit range (0, 100)', function () {
				const schema = Preset.NumberRange(0, 100)();

				assert.strictEqual(schema(1), 1);
				assert.strictEqual(schema(99), 99);
				assert.throws(() => schema(100));
				assert.throws(() => schema(0));
			});

			it('should hit range (0, 100]', function () {
				const schema = Preset.NumberRange(0, [100])();

				assert.strictEqual(schema(1), 1);
				assert.strictEqual(schema(100), 100);
				assert.throws(() => schema(101));
				assert.throws(() => schema(0));
			});

			it('should hit range [0, 100)', function () {
				const schema = Preset.NumberRange([0], 100)();

				assert.strictEqual(schema(0), 0);
				assert.strictEqual(schema(99), 99);
				assert.throws(() => schema(100));
				assert.throws(() => schema(-1));
			});

			it('should hit range [0, 100]', function () {
				const schema = Preset.NumberRange([0], [100])();

				assert.strictEqual(schema(0), 0);
				assert.strictEqual(schema(100), 100);
				assert.throws(() => schema(101));
				assert.throws(() => schema(-1));
			});
		});
	});

	describe('IntegerMultipleOf()', function () {
		it('should throw if bad base.', function () {
			assert.throws(() => Preset.IntegerMultipleOf(0.3), {
				name: 'TypeError',
				message: 'Invalid "base", one "interger" expected.',
			});
		});

		it('should create a schema.', function () {
			Preset.IntegerMultipleOf();
			Preset.IntegerMultipleOf(3);
		});

		describe('schema::', function () {
			it('should pass', function () {
				const x3 = Preset.IntegerMultipleOf(3)();

				assert.strictEqual(x3(6), 6);
				assert.strictEqual(x3(0), 0);
			});

			it('should throw if bad value', function () {
				const x3 = Preset.IntegerMultipleOf(3)();

				assert.throws(() => x3(5));
			});
		});
	});

	describe('StringPattern()', function () {
		it('should throw if bad pattern.', function () {
			assert.throws(() => Preset.StringPattern(), {
				name: 'TypeError',
				message: 'Invalid "pattern", one "RegExp" expected.',
			});
		});

		it('should throw if bad name.', function () {
			assert.throws(() => Preset.StringPattern(/a/, null), {
				name: 'TypeError',
				message: 'Invalid "pattern name", one "string" expected.',
			});
		});

		it('should create a schema.', function () {
			Preset.StringPattern(/a/);
		});

		describe('schema::', function () {
			it('shoud pass.', function () {
				const pattern = Preset.StringPattern(/a/)();

				assert.strictEqual(pattern('a'), 'a');
				assert.strictEqual(pattern('aa'), 'aa');
			});

			it('should throws if bad value.', function () {
				const pattern = Preset.StringPattern(/a/)();

				assert.throws(() => pattern('b'));
			});
		});
	});

	describe('StringLength()', function () {
		it('should throw if bad min.', function () {
			assert.throws(() => Preset.StringLength(-1), {
				name: 'TypeError',
				message: 'Invalid "min", one "integer >= 0" expected.',
			});
		});

		it('should throw if bad max', function () {
			assert.throws(() => Preset.StringLength(10, 9), {
				name: 'TypeError',
				message: 'Invalid "max", one "integer >= min" expected.',
			});
		});

		it('should create a schema.', function () {
			Preset.StringLength();
			Preset.StringLength(1, 1);
			Preset.StringLength(1, 10);
		});

		describe('schema::', function () {
			it('should pass.', function () {
				const length = Preset.StringLength(0, 4)();

				assert.strictEqual(length(''), '');
				assert.strictEqual(length('1234'), '1234');
			});

			it('should throw if bad value.', function () {
				const length = Preset.StringLength(0, 4)();

				assert.throws(() => length(1));
				assert.throws(() => length('12345'));
			});
		});
	});
});