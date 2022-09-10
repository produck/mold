import { Error, Cause } from '../utils/index.mjs';
import * as Type from '../Type/index.mjs';

const assertSchemaFunction = (any, index) => {
	if (!Type.Native.Function(any)) {
		Error.ThrowMoldError(`orSchemaList[${index}]`, 'function as schema');
	}
};

export const Or = (orSchemaList = []) => {
	if (!Type.Object.Array(orSchemaList)) {
		Error.ThrowMoldError('orSchemaList', 'array');
	}

	orSchemaList.forEach(assertSchemaFunction);

	return (_value, _empty) => {
		const causeList = [];

		for (const schema of orSchemaList) {
			try {
				return schema(_value, _empty);
			} catch (cause) {
				causeList.push(cause);
			}
		}

		new Cause.MoldCauseError(null, 'one of')
			.occur(_value, { type: 'Control', data: { control: 'or', causeList } })
			.throw();
	};
};