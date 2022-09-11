import * as Native from '../Native/index.mjs';

const assertSchemaFunction = (any, index) => {
	if (!Native.Base.Type.Function(any)) {
		Native.Base.throwError(`orSchemaList[${index}]`, 'function as schema');
	}
};

export const Or = (orSchemaList = []) => {
	if (!Array.isArray(orSchemaList)) {
		Native.Base.throwError('orSchemaList', 'array');
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

		new Native.Base.MoldCause(_value)
			.setType('CompoundOr')
			.append({ causeList })
			.throw();
	};
};