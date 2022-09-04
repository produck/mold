import * as Schema from '../Schema/index.mjs';
import * as Type from '../Type/index.mjs';

const BASE_SCHEMA_OPTIONS = {
	name: 'PresetTimestamp',
	expected: 'integer as timestamp'
};

const TimestampSchema = (options) => {
	return Schema.Simplex(Type.Number.Integer, {
		...BASE_SCHEMA_OPTIONS,
		...options
	});
};

export { TimestampSchema as Schema };

export const OffsetNow = (value) => {
	if (!Type.Number.Integer(value)) {

	}

	return TimestampSchema({
		Default: () => Date.now() + value
	});
};

export const Optional = (Default = () => Date.now()) => {
	if (!Type.Native.Function(Default)) {

	}

	return TimestampSchema({ Default });
};

export const required = TimestampSchema({ Default: null });

export const now = Optional();