import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';
import { SimplexSchema } from './Schema.mjs';
import { OptionsParser } from './OptionsParser.mjs';

const parseOptions = OptionsParser('object', () => ({}));

export const PROPERTY = Symbol.for('MOLD.PROPERTY');

export const ObjectSchema = (schemaMap = {}, ...schemaOptions) => {
	if (!Type.Helper.PlainObjectLike(schemaMap)) {
		Utils.throwError('schemaMap', 'plain object');
	}

	for (const key in schemaMap) {
		if (!Type.Native.Function(schemaMap[key])) {
			Utils.throwError(`schemaMap["${key}"]`, 'function');
		}
	}

	const hasPropertySchema = Object.hasOwn(schemaMap, PROPERTY);
	const propertySchema = schemaMap[PROPERTY];

	if (hasPropertySchema && !Type.Native.Function(propertySchema)) {
		Utils.throwError('schemaMap[@@PROPERTY]', 'function');
	}

	const finalOptions = parseOptions(schemaOptions);

	return SimplexSchema((_object, _empty, cause) => {
		_object = _empty ? finalOptions.DefaultValue() : _object;

		if (!Type.Helper.PlainObjectLike(_object)) {
			cause.setType('Value').throw();
		}

		const object = {};
		const extra = { ...object };

		for (const key in schemaMap) {
			const schema = schemaMap[key];
			const has = key in _object;

			delete extra[key];

			try {
				const value = schema(_object[key], !has);

				if (!Type.Native.Undefined(value)) {
					object[key] = value;
				}
			} catch (error) {
				cause.setType('ObjectProperty').append({
					key, explicit: true
				}).throw(error);
			}
		}

		const preservedPropertyList = Object.keys(extra);

		if (preservedPropertyList.length > 0) {
			if (!hasPropertySchema) {
				cause.setType('Value').append({
					noAdditionalProperty: true,
					preservedPropertyList
				}).throw();
			}

			for (const key in extra) {
				try {
					object[key] = propertySchema(extra[key], true);
				} catch (error) {
					cause.setType('ObjectProperty').append({
						key, explicit: false
					}).throw(error);
				}
			}
		}

		return object;
	}, ...finalOptions.toSchemaArgs());
};