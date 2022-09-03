import * as Error from './Error.mjs';
import * as Type from './Type.mjs';

const assertSchemaOptions = any => {
	if (!Type.PlainObjectLike(any)) {
		Error.ThrowMoldError('schema options', 'plain object');
	}

	const { expected, Default, modify, name } = any;

	if (!Type.Undefined(name)) {
		if (!Type.String(name)) {
			Error.ThrowMoldError('schema options.name', 'string');
		}
	}

	if (!Type.Undefined(expected)) {
		if (!Type.String(expected)) {
			Error.ThrowMoldError('schema options.required', 'string');
		}
	}

	if (!Type.Undefined(Default)) {
		if (!Type.Function(Default) && !Type.Null(Default)) {
			Error.ThrowMoldError('schema options.Default', 'function or null');
		}
	}

	if (!Type.Undefined(modify)) {
		if (!Type.Function(modify)) {
			Error.ThrowMoldError('schema options.modify', 'function');
		}
	}
};

export {
	assertSchemaOptions as assert
};