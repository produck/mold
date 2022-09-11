import * as Base from './Base/index.mjs';
import * as Utils from './Utils/index.mjs';

const parseOptions = Utils.OptionsParser('array', () => []);

export const ArraySchema = (options, ...schemaOptions) => {
	const finalOptions = parseOptions(schemaOptions);

	return Base.Schema((_array, _empty, cause) => {
		_array = _empty ? finalOptions.DefaultValue() : _array;

		if (!Utils.Type.Array(_array)) {
			cause.setType('Value').throw();
		}

		return _array.map((_item, index) => {
			try {
				return options.items(_item);
			} catch (error) {
				cause.setType('ArrayItem').append({ index }).throw(error);
			}
		});
	}, ...finalOptions.toSchemaArgs());
};
