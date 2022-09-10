import * as Base from './Base/index.mjs';
import * as Utils from './Utils/index.mjs';

const parseOptions = Utils.OptionsParser('array as tuple', () => []);

export const TupleSchema = (schemaList = [], ...schemaOptions) => {
	const finalOptions = parseOptions(schemaOptions);

	return Base.Schema((_tuple, _empty, cause) => {
		_tuple = _empty ? finalOptions.DefaultValue() : _tuple;

		if (!Utils.Type.Array(_tuple)) {
			cause.throw();
		}

		const _length = _tuple.length;

		return schemaList.map((schema, index) => {
			try {
				return schema(_tuple[index], index >= _length);
			} catch (error) {
				cause.write('Tuple', index).throw(error);
			}
		});
	}, ...finalOptions.toSchemaArgs());
};
