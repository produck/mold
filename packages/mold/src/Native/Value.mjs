import * as Base from './Base/index.mjs';
import * as Utils from './Utils/index.mjs';

const parseOptions = Utils.OptionsParser();

export const ValueSchema = (validate, ...schemaOptions) => {
	if (!Base.Type.Function(validate)) {
		Base.throwError('validate', 'function');
	}

	const finalOptions = parseOptions(schemaOptions);

	return Base.Schema((_value, _empty, cause) => {
		const value = _empty ? finalOptions.DefaultValue() : _value;

		if (!validate(value)) {
			cause.setType('Value').throw();
		}

		return value;
	}, ...finalOptions.toSchemaArgs());
};