import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';
import { SimplexSchema } from './Schema.mjs';
import { OptionsParser } from './OptionsParser.mjs';

const parseOptions = OptionsParser('array', () => []);

export const ArraySchema = (descriptor, ...schemaOptions) => {
	if (!Type.Helper.PlainObjectLike(descriptor)) {
		Utils.throwError('descriptor', 'object');
	}

	if (!Type.Native.Function(descriptor.items)) {
		Utils.throwError('descriptor.items', 'function');
	}

	const finalOptions = parseOptions(schemaOptions);

	return SimplexSchema((_array, _empty, cause) => {
		_array = _empty ? finalOptions.DefaultValue() : _array;

		if (!Type.Helper.Array(_array)) {
			cause.setType('Value').throw();
		}

		return _array.map((_item, index) => {
			try {
				return descriptor.items(_item);
			} catch (error) {
				cause.setType('ArrayItem').append({ index }).throw(error);
			}
		});
	}, ...finalOptions.toSchemaArgs());
};
