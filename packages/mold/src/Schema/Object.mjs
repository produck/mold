import { Cause, MoldError } from './Internal/index.mjs';

export const ObjectSchema = (normalizePropertyMap, options = {}) => {
	const { required = false, expected = 'plain object' } = options;
	const cause = new Cause(required, expected);

	return (_object, _empty = false) => {
		cause.clear();

		if (required && _empty) {
			cause.throw();
		}

		_object = _empty ? {} : _object;

		if (typeof _object !== 'object') {
			cause.throw();
		}

		const object = {};

		for (const key in normalizePropertyMap) {
			const normalize = normalizePropertyMap[key];
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