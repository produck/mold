export const ObjectSchema = (NormalizerMap, options = {}) => {
	const {
		required = false,
		expected = 'plain object'
	} = options;

	return (role = '') => {
		const normalizeMap = {};

		for (const key in NormalizerMap) {
			const PropertySchemaNormalizer = NormalizerMap[key];
			const normalize = PropertySchemaNormalizer(`${role}.${key}`);

			normalizeMap[key] = normalize;
		}

		return (_object, _empty = false) => {
			if (required && _empty) {
				throw new TypeError(`One "${expected}" as "${role}" required.`);
			}

			_object = _empty ? {} : _object;

			if (typeof _object !== 'object') {
				throw new TypeError(`Invalid ${role}, one ${expected} expected.`);
			}

			const object = {};

			for (const key in normalizeMap) {
				const normalize = normalizeMap[key];
				const has = Object.prototype.hasOwnProperty.call(_object, key);

				object[key] = normalize(_object[key], !has);
			}

			return object;
		};
	};
};