import { Error } from './utils/index.mjs';
import * as Type from './Type/index.mjs';

export const Circular = (SchemaProxy) => {
	if (!Type.Native.Function(SchemaProxy)) {
		Error.ThrowMoldError('SchemaProxy', 'function');
	}

	const reference = (...args) => schema(...args);
	const schema = SchemaProxy(reference);

	if (!Type.Native.Function(schema)) {
		Error.ThrowMoldError('referenced schema', 'function');
	}

	return schema;
};