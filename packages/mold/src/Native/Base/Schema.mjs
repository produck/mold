import * as Type from './Type.mjs';
import { MoldCause } from './Cause.mjs';

export const throwError = (role, expected) => {
	throw new TypeError(`Invalid "${role}", one "${expected}" expected.`);
};

export const Schema = (normalize, expected, required = false) => {
	if (!Type.Function(normalize)) {
		throwError('normalize', 'function');
	}

	if (!Type.String(expected)) {
		throwError('expected', 'string');
	}

	if (!Type.Boolean(required)) {
		throwError('required', 'boolean');
	}

	return (_value, _empty = false) => {
		if (!Type.Boolean(_empty)) {
			throwError('_empty', 'boolean');
		}

		const cause = new MoldCause(_value).append({ required, expected });

		if (required && !_empty) {
			cause.throw();
		}

		return normalize(_value, _empty, cause);
	};
};