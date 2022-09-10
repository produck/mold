import { Error, Cause } from '../utils/index.mjs';
import * as Type from '../Type/index.mjs';

const assertSchemaFunction = (any, index) => {
	if (!Type.Native.Function(any)) {
		Error.ThrowMoldError(`orSchemaList[${index}]`, 'function as schema');
	}
};

export const And = (andSchemaList = []) => {
	if (!Type.Object.Array(andSchemaList)) {
		Error.ThrowMoldError('andSchemaList', 'array');
	}

	andSchemaList.forEach(assertSchemaFunction);

	return (_value, _empty) => {
		let value = _value;

		try {
			for (const schema of andSchemaList) {
				value = schema(value, _empty);
			}
		} catch (cause) {
			new Cause.MoldCauseError(null, 'one of')
				.occur(_value, { type: 'Control', data: { control: 'and' } })
				.throw();
		}

		return value;
	};
};