import { Cause, Type, Error, Options } from './Internal/index.mjs';

export const ObjectSchema = (propertyNormalizeMap, options = {}) => {
	Options.assert(options);

	if (!Type.PlainObjectLike(propertyNormalizeMap)) {
		Error.ThrowMoldError('propertyNormalizeMap', 'plain object');
	}

	for (const key in propertyNormalizeMap) {
		if (!Type.Function(propertyNormalizeMap[key])) {
			Error.ThrowMoldError(`propertyNormalizeMap["${key}"]`, 'function');
		}
	}

	const {
		name = 'Object',
		expected = 'plain object',
		Default = () => ({}),
		modify = () => {}
	} = options;

	const required = Type.Null(Default);
	const cause = new Cause(required, expected);

	return {
		[name]: (_object, _empty = false) => {
			cause.clear();

			if (required && _empty) {
				cause.throw();
			}

			_object = _empty ? Default() : _object;

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

			modify(object);

			return object;
		}
	}[name];
};