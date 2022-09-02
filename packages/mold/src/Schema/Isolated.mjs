export const IsolatedSchema = (validate, expected, Default = null) => {
	const required = typeof Default !== 'function';

	return (role = 'value') => {
		return (_value, _empty = false) => {
			if (required && _empty) {
				throw new TypeError(`A value as "${role}" required.`);
			}

			const value = _empty ? Default() : _value;

			if (!validate(value)) {
				throw new TypeError(`Invalid "${role}", one "${expected}" expected.`);
			}

			return value;
		};
	};
};