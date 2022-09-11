import * as Native from '../Native/index.mjs';

export const Not = (targetSchema) => {
	if (!Native.Base.Type.Function(targetSchema)) {
		Native.Base.throwError('targetSchema', 'function as schema');
	}

	return (_value, _empty) => {
		try {
			targetSchema(_value, _empty);
		} catch (cause) {
			return _value;
		}

		new Native.Base.MoldCause(_value)
			.setType('CompoundNot')
			.throw();
	};
};