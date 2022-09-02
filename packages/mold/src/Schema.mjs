export const Schema = (validate, expected, Default = null) => { // Schema
	const required = typeof Default !== 'function';

	return Object.assign((role) => { // schema
		return (_value) => { // normalize
			const has = _value !== undefined;

			if (required && !has) {
				throw new TypeError(`A value as "${role}" required.`);
			}

			const value = has ? _value : Default();
			const valid = validate(_value);

			if (!valid) {
				throw new TypeError(`Invalid ${role}, ${expected} expected.`);
			}

			return value;
		};
	}, {
		validate,
		Default
	});
};

export const OptionalObjectSchema = (schemaMap, role) => {
	const properties = {};

	for (const key in schemaMap) {
		const schema = schemaMap[key](`${role}.${key}`);

		properties[key] = schema;
	}

	const validate = (any) => {
		for (const key in properties) {
			const schema = properties[key];

			if (!schema.validate(any)) {
				return false;
			}
		}

		return true;
	};

	const Default = () => {
		const object = {};

		for (const key in properties) {
			object[key] = properties[key].Default();
		}
	};

	return Schema(validate, 'a plain object', Default);
};