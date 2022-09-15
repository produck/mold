import * as Simplex from '../Simplex/index.mjs';
import * as Compound from '../Compound/index.mjs';

export const Constant = (value, expected = JSON.stringify(value)) => {
	return Simplex.Value(any => any === value, `a constant(${expected})`);
};

export const Enum = (valueList = []) => {
	const values = valueList.map(value => JSON.stringify(value)).join(', ');

	return Simplex.Value(any => valueList.includes(any), `value in ${values}`);
};

export const Null = Constant(null);
export const NotNull = Compound.Not(Null);
export const OrNull = (schema) => Compound.Or([Null, schema]);

export * as Integer from './Integer.mjs';
export * as Number from './Number.mjs';
export * as String from './String.mjs';
export * as Time from './Time.mjs';