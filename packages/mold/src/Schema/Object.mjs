import { Cause, Type, Error } from './Internal/index.mjs';

const Role = principal => `ObjectSchema() -> ${principal}`;

export const ObjectSchema = (propertyNormalizeMap, options = {}) => {
	if (!Type.PlainObjectLike(propertyNormalizeMap)) {
		Error.ThrowMoldError(Role('propertyNormalizeMap'), 'plain object');
	}

	if (!Type.PlainObjectLike(options)) {
		Error.ThrowMoldError(Role('options'), 'plain object');
	}

	for (const key in propertyNormalizeMap) {
		if (!Type.Function(propertyNormalizeMap[key])) {
			Error.ThrowMoldError(Role(`propertyNormalizeMap["${key}"]`), 'function');
		}
	}

	const { required = false, expected = 'plain object' } = options;

	if (!Type.Boolean(required)) {
		Error.ThrowMoldError(Role('options.required'), 'boolean');
	}

	if (!Type.String(expected)) {
		Error.ThrowMoldError(Role('options.expected'), 'string');
	}

	const cause = new Cause(required, expected);

	return (_object, _empty = false) => {
		cause.clear();

		if (required && _empty) {
			cause.throw();
		}

		_object = _empty ? {} : _object;

		if (!Type.PlainObjectLike(_object)) {
			cause.throw();
		}

		const object = {};

		for (const key in propertyNormalizeMap) {
			const normalize = propertyNormalizeMap[key];
			const has = Object.prototype.hasOwnProperty.call(_object, key);

			try {
				object[key] = normalize(_object[key], !has);
			} catch (innerCause) {
				innerCause.append(key).throw();
			}
		}

		return object;
	};
};