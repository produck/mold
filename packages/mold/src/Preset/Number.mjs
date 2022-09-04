import * as Schema from '../Schema/index.mjs';
import * as Type from '../Type/index.mjs';

export const Integer = (defaultValue = null) => {
	return Schema.Simplex(Type.Number.Integer, {
		name: 'PresetInteger',
		Default: defaultValue === null ? null : () => defaultValue,
		expected: 'integer'
	});
};

export default Integer;

export const zero = Integer(0);

export const random = Integer(() => Math.random());
