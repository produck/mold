import { Cause, Type, Error, Options } from './Internal/index.mjs';

export const SimplexSchema = (validate, options) => {
	Options.assert(options);

	if (!Type.Function(validate)) {
		Error.ThrowMoldError('validate', 'function');
	}

	const {
		name = 'Value',
		expected,
		Default = null,
		modify = () => {}
	} = options;

	const required = !Type.Function(Default);
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
