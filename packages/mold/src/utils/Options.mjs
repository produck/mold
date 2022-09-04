import * as Error from './Error.mjs';
import * as Type from '../Type/index.mjs';

const assertSchemaOptions = any => {
	if (!Type.Object.PlainLike(any)) {
		Error.ThrowMoldError('schema options', 'plain object');
	}

	const { expected, Default, modify, name } = any;

	if (!Type.Native.Undefined(name)) {
		if (!Type.Native.String(name)) {
			Error.ThrowMoldError('schema options.name', 'string');
		}
	}

	if (!Type.Native.Undefined(expected)) {
		if (!Type.Native.String(expected)) {
			Error.ThrowMoldError('schema options.required', 'string');
		}
	}

	if (!Type.Native.Undefined(Default)) {
		if (!Type.Native.Function(Default) && !Type.Object.Null(Default)) {
			Error.ThrowMoldError('schema options.Default', 'function or null');
		}
	}

	if (!Type.Native.Undefined(modify)) {
		if (!Type.Native.Function(modify)) {
			Error.ThrowMoldError('schema options.modify', 'function');
		}
	}
};

export {
	assertSchemaOptions as assert
};