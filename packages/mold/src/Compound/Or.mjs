import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';

export const Or = (schemaList = []) => {
	if (!Type.Helper.Array(schemaList)) {
		Utils.throwError('schemaList', 'array');
	}

	schemaList.forEach((any, index) => {
		if (!Type.Native.Function(any)) {
			Utils.throwError(`schemaList[${index}]`, 'function');
		}
	});

	return (_value, _empty) => {
		const causeList = [];

		for (const schema of schemaList) {
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