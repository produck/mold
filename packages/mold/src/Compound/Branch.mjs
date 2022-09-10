import { Error } from '../utils/index.mjs';
import * as Type from '../Type/index.mjs';

export const Branch = (options) => {
	if (!Type.Object.PlainLike(options)) {
		Error.ThrowMoldError('branch options', 'plain object');
	}

	if (!Type.Native.Function(options.if)) {
		Error.ThrowMoldError('branch options.if', 'function');
	}

	if (!Type.Native.Function(options.then)) {
		Error.ThrowMoldError('branch options.if', 'function');
	}

	if (!Type.Native.Function(options.else)) {
		Error.ThrowMoldError('branch options.if', 'function');
	}

	return (_value, _empty) => {
		const flag = options.if(_value);

		if (!Type.Native.Boolean(flag)) {
			Error.ThrowMoldError('branch->options.if() return value', 'boolean');
		}

		(flag ? options.then : options.else)(_value, _empty);
	};
};