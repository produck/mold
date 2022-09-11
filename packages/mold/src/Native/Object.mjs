import * as Base from './Base/index.mjs';
import * as Utils from './Utils/index.mjs';

const parseOptions = Utils.OptionsParser('object', () => ({}));

export const ObjectSchema = (schemaMap, ...schemaOptions) => {
	if (!Utils.Type.PlainObjectLike(schemaMap)) {
		Base.throwError('schemaMap', 'object');
	}

	const finalOptions = parseOptions(schemaOptions);

	return Base.Schema((_object, _empty, cause) => {
		_object = _empty ? finalOptions.DefaultValue() : _object;

		if (!Utils.Type.PlainObjectLike(_object)) {
			cause.setType('Value').throw();
		}

		const object = {};

		for (const key in schemaMap) {
			const schema = schemaMap[key];
			const has = key in _object;

			try {
				object[key] = schema(_object, !has);
			} catch (error) {
				cause.setType('ObjectProperty').append({ key }).throw(error);
			}
		}

		return object;
	}, ...finalOptions.toSchemaArgs());
};
