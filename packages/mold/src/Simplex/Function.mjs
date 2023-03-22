import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';
import { SimplexSchema } from './Schema.mjs';
import { OptionsParser } from './OptionsParser.mjs';

const parseOptions = OptionsParser('function');

const DEFAULT_OPTIONS = {
	args: [],
	ret: any => any,
};

export const FunctionSchema = (options = DEFAULT_OPTIONS, ...schemaOptions) => {

	const finalOptions = parseOptions(schemaOptions);

	return SimplexSchema((_function, _empty, cause) => {
		if (_empty) {
			_function = finalOptions.DefaultValue();
		}

		if (!Type.Native.Function(_function)) {
			cause.setType('Value').throw();
		}

	}, ...finalOptions.toSchemaArgs());
};
