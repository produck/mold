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
	const cause = new Cause(required, expected);

	return {
		[name]: (_value, _empty = false) => {
			cause.clear();

			if (required && _empty) {
				cause.throw();
			}

			const value = _empty ? Default() : _value;

			if (!validate(value)) {
				cause.throw();
			}

			modify(value);

			return value;
		}
	}[name];
};
