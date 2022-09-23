import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';
import { SimplexSchema } from './Schema.mjs';
import { OptionsParser } from './OptionsParser.mjs';

const parseOptions = OptionsParser('array', () => []);
const DEFAULT_ANY = any => any;

export const ArraySchema = (itemSchema = DEFAULT_ANY, ...schemaOptions) => {
	if (!Type.Native.Function(itemSchema)) {
		Utils.throwError('itemSchema', 'function');
	}

	const finalOptions = parseOptions(schemaOptions);

	return SimplexSchema((_array, _empty, cause) => {
		_array = _empty ? finalOptions.DefaultValue() : _array;

		if (!Type.Helper.Array(_array)) {
			cause.setType('Value').throw();
		}

		return _array.map((_item, index) => {
			try {
				return itemSchema(_item);
			} catch (error) {
				cause.setType('ArrayItem').append({ index }).throw(error);
			}
		});
	}, ...finalOptions.toSchemaArgs());
};
