import { Cause, Error, Options } from '../utils/index.mjs';
import * as Type from '../Type/index.mjs';

export const SimplexSchema = (validate, schemaOptions) => {
	Options.assert(schemaOptions);

	if (!Type.Native.Function(validate)) {
		Error.ThrowMoldError('validate', 'function');
	}

	const {
		name = 'Simplex',
		expected,
		Default = null,
		modify = () => {}
	} = schemaOptions;

	const required = !Type.Native.Function(Default);
	const throwCause = Cause.Thrower(required, expected);

	return {
		[name]: (_value, _empty = false) => {
			if (required && _empty) {
				throwCause();
			}

			const value = _empty ? Default() : _value;

			if (!validate(value)) {
				throwCause(value);
			}

			try {
				modify(value);
			} catch (error) {
				throwCause(value, error);
			}

			return value;
		}
	}[name];
};
