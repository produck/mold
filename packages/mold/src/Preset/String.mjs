import * as Schema from '../Schema/index.mjs';
import * as Type from '../Type/index.mjs';

export const Pattern = (regexp) => {
	return Schema.Simplex(Type.Number.Integer, {
		name: 'PresetString',
		Default: defaultValue === null ? null : () => defaultValue,
		expected: 'integer'
	});
};

export const Max = () => {

};

export const Min = () => {

};

export const Length = () => {

};

// export const hex = Pattern();

// export const sha1 = Pattern();

// export const sha256 = Pattern();

// export const base64 = Pattern();

