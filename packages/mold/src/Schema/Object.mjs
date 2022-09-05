import { Cause, Error, Options } from '../utils/index.mjs';
import * as Type from '../Type/index.mjs';

export const ObjectSchema = (propertyNormalizeMap, schemaOptions = {}) => {
	Options.assert(schemaOptions);

	if (!Type.Object.PlainLike(propertyNormalizeMap)) {
		Error.ThrowMoldError('propertyNormalizeMap', 'plain object');
	}

	for (const key in propertyNormalizeMap) {
		if (!Type.Native.Function(propertyNormalizeMap[key])) {
			Error.ThrowMoldError(`propertyNormalizeMap["${key}"]`, 'function');
		}
	}

	const {
		name = 'Object',
		expected = 'plain object',
		Default = () => ({}),
		modify = () => {}
	} = schemaOptions;

	const required = Type.Object.Null(Default);
	const throwCause = Cause.Thrower(required, expected);

	return {
		[name]: (_object, _empty = false) => {
			if (required && _empty) {
				throwCause();
			}

			_object = _empty ? Default() : _object;

			if (!Type.Object.PlainLike(_object)) {
				throwCause(_object);
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

			try {
				modify(object);
			} catch (error) {
				throwCause(object, error);
			}

			return object;
		}
	}[name];
};