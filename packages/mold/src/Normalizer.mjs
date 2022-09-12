import * as Type from './Type/index.mjs';
import * as Utils from './Utils/index.mjs';
import * as CauseMessage from './Message/index.mjs';

export const Normalizer = (schema, caught = CauseMessage.Simple) => {
	if (!Type.Native.Function(schema)) {
		Utils.throwError('schema', 'function as schema');
	}

	if (!Type.Native.Function(caught)) {
		Utils.throwError('caught', 'function');
	}

	return (...args) => {
		try {
			return schema(args[0], args.length === 0);
		} catch (cause) {
			caught(cause);
		}
	};
};