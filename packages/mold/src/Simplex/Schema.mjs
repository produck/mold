import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';

export const SimplexSchema = (normalize, expected, required = false) => {
	if (!Type.Native.Function(normalize)) {
		Utils.throwError('normalize', 'function');
	}

	if (!Type.Native.String(expected)) {
		Utils.throwError('expected', 'string');
	}

	if (!Type.Native.Boolean(required)) {
		Utils.throwError('required', 'boolean');
	}

	return (_value, _empty = false) => {
		if (!Type.Native.Boolean(_empty)) {
			Utils.throwError('_empty', 'boolean');
		}

		const cause = new Utils.MoldCause(_value).append({ required, expected });

		if (required && _empty) {
			cause.setType('SimplexRequired').throw();
		}

		return normalize(_value, _empty, cause);
	};
};