import * as Simplex from '../Simplex/index.mjs';
import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';

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