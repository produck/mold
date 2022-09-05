import * as Schema from '../Schema/index.mjs';
import * as Type from '../Type/index.mjs';

const ALL_REGEXP = /.*/;

const BASE_SCHEMA_OPTIONS = {
	name: 'PresetString',
};

export const Pattern = (regexp = ALL_REGEXP, options) => {
	const validate = any => Type.Native.String(any) && regexp.test(any);

	return Schema.Simplex(validate, {
		...BASE_SCHEMA_OPTIONS,
		...options,
		expected: `string like ${regexp.source}`
	});
};

export const Max = () => {

};

export const Min = () => {

};

export const Length = () => {

};

export const empty = Pattern(ALL_REGEXP, { Default: () => '' });

// export const hex = Pattern();

// export const sha1 = Pattern();

// export const sha256 = Pattern();

// export const base64 = Pattern();

