import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';

export const Not = (targetSchema) => {
	if (!Type.Native.Function(targetSchema)) {
		Utils.throwError('targetSchema', 'function');
	}

	return (_value, _empty) => {
		try {
			targetSchema(_value, _empty);
		} catch (cause) {
			return _value;
		}

		new Utils.MoldCause(_value).setType('CompoundNot').throw();
	};
};