import * as Native from '../Native/index.mjs';

const assertSchemaFunction = (any, index) => {
	if (!Native.Base.Type.Function(any)) {
		Native.Base.throwError(`orSchemaList[${index}]`, 'function as schema');
	}
};

export const And = (andSchemaList = []) => {
	if (!Array.isArray(andSchemaList)) {
		Native.Base.throwError('andSchemaList', 'array');
	}

	andSchemaList.forEach(assertSchemaFunction);

	return (_value, _empty) => {
		return andSchemaList.reduce((value, schema, index) => {
			try {
				return schema(value, _empty);
			} catch (error) {
				new Native.Base.MoldCause(_value)
					.setType('CompoundAnd')
					.append({ causeIndex: index })
					.throw(error);
			}
		}, _value);
	};
};