
export const ObjectExecuter = (schemas) => {
	const execute = (_options, parent = '') => {
		const options = {};

		for (const key in schemas) {
			const schema = schemas[key];
			const hasValue = Object.prototype.hasOwnProperty.call(_options, key);

			if (!hasValue && !schema.hasDefault) {
				throw new TypeError('');
			}


			const _value = _options[key];
			const defaultValue = schema.Default();

			options[key] = _value;
		}

		return options;
	};

	return execute;
};