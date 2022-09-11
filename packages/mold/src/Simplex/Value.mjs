import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';
import { SimplexSchema } from './Schema.mjs';
import { OptionsParser } from './OptionsParser.mjs';

const parseOptions = OptionsParser();

export const ValueSchema = (validate, ...schemaOptions) => {
	if (!Type.Native.Function(validate)) {
		Utils.throwError('validate', 'function');
	}

	const finalOptions = parseOptions(schemaOptions);

	return SimplexSchema((_value, _empty, cause) => {
		const value = _empty ? finalOptions.DefaultValue() : _value;

		if (!validate(value)) {
			cause.setType('Value').throw();
		}

		return value;
	}, ...finalOptions.toSchemaArgs());
};