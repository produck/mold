import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';

export const Or = (orSchemaList = []) => {
	if (!Type.Helper.Array(orSchemaList)) {
		Utils.throwError('orSchemaList', 'array');
	}

	orSchemaList.forEach((any, index) => {
		if (!Type.Native.Function(any)) {
			Utils.throwError(`orSchemaList[${index}]`, 'function as schema');
		}
	});

	return (_value, _empty) => {
		const causeList = [];

		for (const schema of orSchemaList) {
			try {
				return schema(_value, _empty);
			} catch (cause) {
				causeList.push(cause);
			}
		}

		new Utils.MoldCause(_value)
			.setType('CompoundOr')
			.append({ causeList })
			.throw();
	};
};