import { Cause, Error, Options } from '../utils/index.mjs';
import * as Type from '../Type/index.mjs';

export const ArraySchema = (arrayOptions, schemaOptions = {}) => {
	Options.assert(schemaOptions);

	if (!Type.Object.PlainLike(arrayOptions)) {
		Error.ThrowMoldError('arrayOptions', 'plain object');
	}

	const { item: itemSchema } = arrayOptions;

	if (!Type.Native.Function(itemSchema)) {
		Error.ThrowMoldError('arrayOptions.item', 'function');
	}

	const {
		name = 'Array',
		expected = 'array',
		Default = () => [],
		modify = () => {}
	} = schemaOptions;

	const required = Type.Object.Null(Default);

	const toNormalized = (_item, index) => {
		try {
			return itemSchema(_item);
		} catch (innerCause) {
			innerCause.append(index, 'Array').throw();
		}
	};

	const throwCause = Cause.Thrower(required, expected);

	return {
		[name]: (_array, _empty) => {
			if (required && _empty) {
				throwCause();
			}

			_array = _empty ? Default() : _array;

			if (!Type.Object.Array(_array)) {
				throwCause(_array);
			}

			const array = _array.map(toNormalized);

			try {
				modify(array);
			} catch (error) {
				throwCause(array, error);
			}

			return array;
		}
	}[name];
};