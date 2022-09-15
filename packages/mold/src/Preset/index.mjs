import * as Simplex from '../Simplex/index.mjs';
import * as Compound from '../Compound/index.mjs';
import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';

export const Constant = (value) => {
	return Simplex.Value(any => any === value, `a constant(${value})`);
};

export const Enum = (valueList = []) => {
	const values = valueList.map(value => JSON.stringify(value)).join(', ');

	return Simplex.Value(any => valueList.includes(any), `value in ${values}`);
};

export const Null = Constant(null);
export const NotNull = Compound.Not(Null);
export const OrNull = (schema) => Compound.Or([Null, schema]);

const TypeSchemaProvider = (validate, expected) => {
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

export const Number = TypeSchemaProvider(Type.Native.Number, 'number');
export const String = TypeSchemaProvider(Type.Native.String, 'string');
export const Boolean = TypeSchemaProvider(Type.Native.Boolean, 'boolean');
export const Function = TypeSchemaProvider(Type.Native.Function, 'function');
export const Symbol = TypeSchemaProvider(Type.Native.Symbol, 'symbol');
export const Integer = TypeSchemaProvider(Type.Number.Integer, 'integer');

export * as Format from './Format/index.mjs';