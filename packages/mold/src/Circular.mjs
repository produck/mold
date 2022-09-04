import { Error } from './utils/index.mjs';
import * as Type from './Type/index.mjs';

export const Circular = (SchemaProxy) => {
	if (!Type.Native.Function(SchemaProxy)) {
		Error.ThrowMoldError('SchemaProxy', 'function');
	}

	const Reference = (...args) => schema(...args);
	const schema = SchemaProxy(Reference);

	if (!Type.Native.Function(schema)) {
		Error.ThrowMoldError('referenced schema', 'function');
	}

	return schema;
};