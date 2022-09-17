import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';
import * as Simplex from '../Simplex/index.mjs';
import * as Compound from '../Compound/index.mjs';

export const Constant = (value) => {
	return Simplex.Value(any => any === value, `a constant(${value})`);
};

export const Enum = (valueList = []) => {
	const values = valueList.map(value => JSON.stringify(value)).join(', ');

	return Simplex.Value(any => valueList.includes(any), `value in ${values}`);
};

export const Null = Constant(null);
export const NotNull = Compound.Not(Null);
export const OrNull = (schema) => Compound.Or([Null, schema]);

export const Instance = Constructor => {
	if (!Type.Native.Function(Constructor)) {
		Utils.throwError('Constructor', 'class or function');
	}

	const validate = any => any instanceof Constructor;

	return Simplex.Value(validate, `${Constructor.name} instance`);
};

export * as Type from './Type.mjs';
export * as Number from './Number.mjs';
export * as Integer from './Integer.mjs';
export * as String from './String.mjs';
export * as Time from './Time.mjs';