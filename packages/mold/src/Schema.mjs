const SimpleSchema = (validate, expected, Default = null) => { // Schema
	const required = typeof Default !== 'function';

	return role => { // SchemaNormalizer
		return _value => { // normalize
			const has = _value !== undefined;

			if (required && !has) {
				throw new TypeError(`A value as "${role}" required.`);
			}

			const value = has ? _value : Default();

			if (!validate(value)) {
				throw new TypeError(`Invalid "${role}", one "${expected}" expected.`);
			}

			return value;
		};
	};
};

const ObjectSchema = (NormalizerMap, options = {}) => {
	const {
		required = false,
		expected = 'a plain object'
	} = options;

	return (role = '') => {
		const normalizeMap = {};

		for (const key in NormalizerMap) {
			const PropertySchemaNormalizer = NormalizerMap[key];
			const normalize = PropertySchemaNormalizer(`${role}.${key}`);

			normalizeMap[key] = normalize;
		}

		return _object => {
			const has = _object !== undefined;

			if (required && !has) {
				throw new TypeError(`One "${expected}" as "${role}" required.`);
			}

			_object = has ? _object : {};

			if (typeof _object !== 'object') {
				throw new TypeError(`Invalid ${role}, one ${expected} expected.`);
			}

			const object = {};

			for (const key in normalizeMap) {
				const normalize = normalizeMap[key];

				object[key] = normalize(_object[key]);
			}

			return object;
		};
	};
};

const CustomSchema = (normalize) => {
	return role => _value => normalize(role, _value);
};

const TupleSchema = (elementSchemaTuple) => {
	return role => {

	};
};

const ArraySchema = (itemSchema, role) => {
	return role => {

	}
};

export {
	SimpleSchema as Simple,
	ObjectSchema as Object,
	ArraySchema as Array,
	CustomSchema as Custom
};