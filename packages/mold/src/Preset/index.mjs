import * as Schema from '../Schema/index.mjs';
import * as Type from '../Type/index.mjs';

export * as Number from './Number.mjs';
export * as String from './String.mjs';
export * as Time from './Time.mjs';

export const Function = (defaultValue = null) => {
	return Schema.Simplex(Type.Native.Function, {
		name: 'PresetFunction',
		expected: 'function',
		Default: defaultValue === null ? null : () => defaultValue,
	});
};

export const Enum = null;
export const Constant = null;
export const OrNull = null;