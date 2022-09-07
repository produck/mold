import { Error, Cause } from '../utils/index.mjs';
import * as Type from '../Type/index.mjs';

export const Not = (targetSchema) => {
	if (!Type.Native.Function(targetSchema)) {
		Error.ThrowMoldError('targetSchema', 'function as schema');
	}

	return (_value, _empty) => {
		try {
			targetSchema(_value, _empty);

			new Cause.MoldCauseError(null, '')
				.occur(_value, { type: 'Control', data: { control: 'not' } });

		} catch (cause) {
			return _value;
		}
	};
};