import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';

export const And = (schemaList = []) => {
	if (!Type.Helper.Array(schemaList)) {
		Utils.throwError('schemaList', 'array');
	}

	schemaList.forEach((any, index) => {
		if (!Type.Native.Function(any)) {
			Utils.throwError(`schemaList[${index}]`, 'function');
		}
	});

	return (_value, _empty) => {
		return schemaList.reduce((value, schema, index) => {
			try {
				return schema(value, _empty && Type.Native.Undefined(value));
			} catch (error) {
				new Utils.MoldCause(_value)
					.setType('CompoundAnd')
					.append({ causeIndex: index })
					.throw(error);
			}
		}, _value);
	};
};