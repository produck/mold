import { Cause, MoldError } from './Internal/index.mjs';

export const IsolatedSchema = (validate, expected, Default = null) => {
	const required = typeof Default !== 'function';
	const cause = new Cause(required, expected);

	return (_value, _empty = false) => {
		cause.clear();

		if (required && _empty) {
			cause.throw();
		}

		const value = _empty ? Default() : _value;

		if (!validate(value)) {
			cause.throw();
		}

		return value;
	};
};