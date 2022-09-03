import { Cause, MoldError } from './Internal/index.mjs';

export const ArraySchema = (normalizeItem, options = {}) => {
	const { required = false, expected = 'array' } = options;
	const cause = new Cause(required, expected);

	const toNormalize = (_item, index) => {
		try {
			return normalizeItem(_item);
		} catch (innerCause) {
			innerCause.append(index).throw();
		}
	};

	return (_array, _empty) => {
		cause.clear();

		if (required && _empty) {
			cause.throw();
		}

		_array = _empty ? [] : _array;

		if (!Array.isArray(_array)) {
			cause.throw();
		}

		return _array.map(toNormalize);
	};
};