import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';
import { SimplexSchema } from './Schema.mjs';
import { OptionsParser } from './OptionsParser.mjs';

const parseOptions = OptionsParser('array as tuple', () => []);

export const TupleSchema = (schemaList = [], ...schemaOptions) => {
	if (!Type.Helper.Array(schemaList)) {
		Utils.throwError('schemaList', 'array');
	}

	for (const index in schemaList) {
		if (!Type.Native.Function(schemaList[index])) {
			Utils.throwError(`schemaList[${index}]`, 'function');
		}
	}

	const finalOptions = parseOptions(schemaOptions);

	return SimplexSchema((_tuple, _empty, cause) => {
		_tuple = _empty ? finalOptions.DefaultValue() : _tuple;

		if (!Type.Helper.Array(_tuple)) {
			cause.setType('Value').throw();
		}

		const _length = _tuple.length;

		return schemaList.map((schema, index) => {
			try {
				return schema(_tuple[index], index >= _length);
			} catch (error) {
				cause.setType('TupleElement').append({ index }).throw(error);
			}
		});
	}, ...finalOptions.toSchemaArgs());
};
