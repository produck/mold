import { Cause, Type, Error } from './Internal/index.mjs';

const Role = principal => `ArraySchema() -> ${principal}`;

export const ArraySchema = (normalizeItem, options = {}) => {
	if (!Type.Function(normalizeItem)) {
		Error.ThrowMoldError(Role('normalizeItem'), 'function');
	}

	if (!Type.PlainObjectLike(options)) {
		Error.ThrowMoldError(Role('options'), 'plain object');
	}

	const { required = false, expected = 'array' } = options;

	if (!Type.Boolean(required)) {
		Error.ThrowMoldError(Role('options.required'), 'boolean');
	}

	if (!Type.String(expected)) {
		Error.ThrowMoldError(Role('options.expected'), 'string');
	}

	const cause = new Cause(required, expected);

	const toNormalized = (_item, index) => {
		try {
			return normalizeItem(_item);
		} catch (innerCause) {
			innerCause.append(index).throw();
		}
	};

	const arraySchema = (_array, _empty) => {
		cause.clear();

		if (required && _empty) {
			cause.throw();
		}

		_array = _empty ? [] : _array;

		if (!Type.Array(_array)) {
			cause.throw();
		}

		return _array.map(toNormalized);
	};

	return arraySchema;
};