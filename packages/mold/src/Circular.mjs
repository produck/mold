import * as Type from './Type/index.mjs';
import * as Utils from './Utils/index.mjs';

export const Circular = (proxy) => {
	if (!Type.Native.Function(proxy)) {
		Utils.throwError('proxy', 'function');
	}

	const reference = (_value, _empty) => schema(_value, _empty);
	const schema = proxy(reference);

	if (!Type.Native.Function(schema)) {
		Utils.throwError('referenced schema', 'function');
	}

	return schema;
};