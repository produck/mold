import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';
import { SimplexSchema } from './Schema.mjs';
import { OptionsParser } from './OptionsParser.mjs';

const parseOptions = OptionsParser('object', () => ({}));

export const ObjectSchema = (schemaMap = {}, ...schemaOptions) => {
	if (!Type.Helper.PlainObjectLike(schemaMap)) {
		Utils.throwError('schemaMap', 'object');
	}

	for (const key in schemaMap) {
		if (!Type.Native.Function(schemaMap[key])) {
			Utils.throwError(`schemaMap["${key}"]`, 'function');
		}
	}

	const finalOptions = parseOptions(schemaOptions);

	return SimplexSchema((_object, _empty, cause) => {
		_object = _empty ? finalOptions.DefaultValue() : _object;

		if (!Type.Helper.PlainObjectLike(_object)) {
			cause.setType('Value').throw();
		}

		const object = { ..._object };

		for (const key in schemaMap) {
			const schema = schemaMap[key];
			const has = key in _object;

			try {
				const value = schema(_object[key], !has);

				if (!Type.Native.Undefined(value)) {
					object[key] = value;
				}
			} catch (error) {
				cause.setType('ObjectProperty').append({ key }).throw(error);
			}
		}

		return object;
	}, ...finalOptions.toSchemaArgs());
};
