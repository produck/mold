import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';

export const And = (andSchemaList = []) => {
	if (!Type.Helper.Array(andSchemaList)) {
		Utils.throwError('andSchemaList', 'array');
	}

	andSchemaList.forEach((any, index) => {
		if (!Type.Native.Function(any)) {
			Utils.throwError(`orSchemaList[${index}]`, 'function as schema');
		}
	});

	return (_value, _empty) => {
		return andSchemaList.reduce((value, schema, index) => {
			try {
				return schema(value, _empty);
			} catch (error) {
				new Utils.MoldCause(_value)
					.setType('CompoundAnd')
					.append({ causeIndex: index })
					.throw(error);
			}
		}, _value);
	};
};