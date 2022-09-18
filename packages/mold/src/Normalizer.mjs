import * as Type from './Type/index.mjs';
import * as Utils from './Utils/index.mjs';
import * as Catcher from './Catcher/index.mjs';

export const Normalizer = (schema, catcher = Catcher.Simple) => {
	if (!Type.Native.Function(schema)) {
		Utils.throwError('schema', 'function as schema');
	}

	if (!Type.Native.Function(catcher)) {
		Utils.throwError('caught', 'function');
	}

	return (...args) => {
		try {
			return schema(args[0], args.length === 0);
		} catch (cause) {
			catcher(cause);
		}
	};
};