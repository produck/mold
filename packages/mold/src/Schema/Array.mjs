export const ArraySchema = (itemSchema, options = {}) => {
	const {
		require: required = false,
		expected = 'array'
	} = options;

	return role => {
		const normalizeItem = itemSchema(`${role}[?]`);
		const toNormalize = (_item) => normalizeItem(_item, false);

		return (_array, _empty) => {
			if (required && _empty) {
				throw new TypeError(`One "${expected}" as "${role}" required.`);
			}

			_array = _empty ? [] : _array;

			if (!Array.isArray(_array)) {
				throw new TypeError(`Invalid ${role}, one ${expected} expected.`);
			}

			return _array.map(toNormalize);
		};
	};
};