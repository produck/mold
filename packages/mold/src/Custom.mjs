import * as Type from './Type/index.mjs';
import * as Utils from './Utils/index.mjs';

const DEFAULT_PROXY = next => next();

export const Custom = (schema, proxy = DEFAULT_PROXY) => {
	if (!Type.Native.Function(schema)) {
		Utils.throwError('schema', 'function as schema');
	}

	if (!Type.Native.Function(proxy)) {
		Utils.throwError('proxy', 'function');
	}

	return (_value, _empty) => {
		const next = () => schema(_value, _empty);

		return proxy(_value, _empty, next);
	};
};
