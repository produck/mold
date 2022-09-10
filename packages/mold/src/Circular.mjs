import * as Native from './Native/index.mjs';

export const Circular = (SchemaProxy) => {
	if (!Native.Base.Type.Function(SchemaProxy)) {
		Native.Base.throwError('SchemaProxy', 'function');
	}

	const reference = (...args) => schema(...args);
	const schema = SchemaProxy(reference);

	if (!Native.Base.Type.Function(schema)) {
		Native.Base.throwError('referenced schema', 'function');
	}

	return schema;
};