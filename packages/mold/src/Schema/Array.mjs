import { Cause, Error, Options } from '../utils/index.mjs';
import * as Type from '../Type/index.mjs';

export const ArraySchema = (normalizeItem, options = {}) => {
	Options.assert(options);

	if (!Type.Native.Function(normalizeItem)) {
		Error.ThrowMoldError('normalizeItem', 'function');
	}

	const {
		name = 'Array',
		expected = 'array',
		Default = () => [],
		modify = () => {}
	} = options;

	const required = Type.Object.Null(Default);
	const cause = new Cause(required, expected);

	const toNormalized = (_item, index) => {
		try {
			return normalizeItem(_item);
		} catch (innerCause) {
			innerCause.append(index).throw();
		}
	};

	return {
		[name]: (_array, _empty) => {
			cause.clear();

			if (required && _empty) {
				cause.throw();
			}

			_array = _empty ? Default() : _array;

			if (!Type.Object.Array(_array)) {
				cause.throw();
			}

			const array = _array.map(toNormalized);

			modify(array);

			return array;
		}
	}[name];
};