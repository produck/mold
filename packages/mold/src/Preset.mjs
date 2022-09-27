import * as Type from './Type/index.mjs';
import * as Utils from './Utils/index.mjs';
import * as Simplex from './Simplex/index.mjs';
import * as Compound from './Compound/index.mjs';

export const Constant = (value) => {
	return Simplex.Value(any => any === value, `a constant(${value})`);
};

export const Enum = (valueList = []) => {
	if (!Type.Object.Array(valueList)) {
		Utils.throwError('valueList', 'array');
	}

	const values = valueList.map(value => JSON.stringify(value)).join(', ');

	return Simplex.Value(any => valueList.includes(any), `value in ${values}`);
};

export const Null = Constant(null);
export const NotNull = Compound.Not(Null);

export const OrNull = (schema) => {
	if (!Type.Native.Function(schema)) {
		Utils.throwError('schema', 'function');
	}

	return Compound.Or([Null, schema]);
};

export const Instance = Constructor => {
	if (!Type.Native.Function(Constructor)) {
		Utils.throwError('Constructor', 'class or function');
	}

	const validate = any => any instanceof Constructor;

	return Simplex.Value(validate, `${Constructor.name} instance`);
};

const SchemaProvider = (validate, expected) => {
	return (defaultValue) => {
		const finalArgs = [validate, expected];

		if (!Type.Native.Undefined(defaultValue)) {
			if (!validate(defaultValue)) {
				Utils.throwError('defaultValue', expected);
			}

			finalArgs.push(() => defaultValue);
		}

		return Simplex.Value(...finalArgs);
	};
};

export const Number = SchemaProvider(Type.Native.Number, 'number');
export const String = SchemaProvider(Type.Native.String, 'string');
export const Boolean = SchemaProvider(Type.Native.Boolean, 'boolean');
export const Function = SchemaProvider(Type.Native.Function, 'function');
export const Symbol = SchemaProvider(Type.Native.Symbol, 'symbol');
export const Integer = SchemaProvider(Type.Number.Integer, 'integer');

const DEFAULT = {
	EDGE: [-Infinity, +Infinity],
	OPEN: [false, false]
};

const NumberRangeValidate = {
	[0b00]: (min, max) => any => any >= min && any <= max,
	[0b01]: (min, max) => any => any >= min && any < max,
	[0b10]: (min, max) => any => any > min && any <= max,
	[0b11]: (min, max) => any => any > min && any < max,
};

const flagOfOpen = open => {
	let flag = 0;

	if (open[0]) {
		flag |= 0b10;
	}

	if (open[1]) {
		flag |= 0b01;
	}

	return flag;
};

export const NumberRange = (edge = DEFAULT.EDGE, open = DEFAULT.OPEN) => {
	if (!Type.Object.Array(edge)) {
		Utils.throwError('edge', 'array like [minValue, maxValue]');
	}

	const [minValue, maxValue] = edge;

	if (!Type.Native.Number(minValue)) {
		Utils.throwError('edge[0]', 'interger as [minValue,]');
	}

	if (!Type.Native.Number(maxValue)) {
		Utils.throwError('edge[1]', 'interger as [, maxValue]');
	}

	if (minValue > maxValue) {
		throw new RangeError('It should be edge[0] <= edge [1].');
	}

	if (!Type.Object.Array(open)) {
		Utils.throwError('open', 'array like [minOpen, maxOpen]');
	}

	const [minOpen, maxOpen] = open;

	if (!Type.Native.Boolean(minOpen)) {
		Utils.throwError('open[0]', 'boolean as [minOpen]');
	}

	if (!Type.Native.Boolean(maxOpen)) {
		Utils.throwError('open[1]', 'boolean as [, maxOpen]');
	}

	const flag = flagOfOpen(open);
	const validateRange = NumberRangeValidate[flag](minValue, maxValue);
	const validate = any => Type.Native.Number(any) && validateRange(any);

	const minSymbol = minOpen ? '(' : '[';
	const maxSymbol = maxOpen ? ')' : ']';
	const expected = `number in ${minSymbol}${edge.join(', ')}${maxSymbol}`;

	return SchemaProvider(validate, expected);
};

export const IntegerMultipleOf = (base = 1) => {
	if (!Type.Number.Integer(base)) {
		Utils.throwError('base', 'interger');
	}

	const validate = any => Type.Number.Integer(any) && any % base === 0;

	return SchemaProvider(validate, `integer multiple of ${base}`);
};

const pow2 = exp => Math.pow(2, exp);

export const Port = NumberRange([1, pow2(16) - 1]);
export const INT8 = NumberRange([-pow2(7), pow2(7) - 1]);
export const UINT8 = NumberRange([0, pow2(8) - 1]);
export const INT16 = NumberRange([-pow2(15), pow2(15) - 1]);
export const UINT16 = NumberRange([0, pow2(16) - 1]);
export const INT24 = NumberRange([-pow2(23), pow2(23) - 1]);
export const UINT24 = NumberRange([0, pow2(24) - 1]);
export const INT32 = NumberRange([-pow2(31), pow2(31) - 1]);
export const UINT32 = NumberRange([0, pow2(32) - 1]);
export const Byte = UINT8;

export const StringPattern = (pattern, name) => {
	if (!Type.Object.RegExp(pattern)) {
		Utils.throwError('pattern', 'RegExp');
	}

	if (Type.Native.Undefined(name)) {
		name = `/${pattern.source}/`;
	}

	if (!Type.Native.String(name)) {
		Utils.throwError('pattern name', 'string');
	}

	const validate = any => Type.Native.String(any) && pattern.test(any);

	return SchemaProvider(validate, `string like ${name}`);
};

export const StringLength = (min = 0, max = min) => {
	if (!Type.Number.Integer(min) || min < 0) {
		Utils.throwError('min', 'integer >= 0');
	}

	if (!Type.Number.Integer(max) || max < min) {
		Utils.throwError('max', 'integer >= min');
	}

	const validate = any => Type.Native.String(any)
		&& any.length >= min
		&& any.length <= max;

	const expectedLength = min === max ? `${min}` : `${min}~${max}`;

	return SchemaProvider(validate, `string length ${expectedLength}`);
};
