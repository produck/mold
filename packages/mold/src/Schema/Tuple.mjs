import { Cause, Error, Options } from '../utils/index.mjs';
import * as Type from '../Type/index.mjs';

export const TupleSchema = (elementNormalizeList, schemaOptions = {}) => {
	Options.assert(schemaOptions);

	if (!Type.Object.Array(elementNormalizeList)) {
		Error.ThrowMoldError('elementNormalizeList', 'array');
	}

	elementNormalizeList.forEach((normalize, index) => {
		if (!Type.Native.Function(normalize)) {
			Error.ThrowMoldError(`elementNormalizeList[${index}]`, 'function');
		}
	});

	const {
		name = 'Tuple',
		expected = `array(${length})`,
		Default = () => [],
		modify = () => {}
	} = schemaOptions;

	const length = elementNormalizeList.length;
	const required = Type.Object.Null(Default);
	const throwCause = Cause.Thrower(required, expected);

	function toFinalElement(normalizeElement, index) {
		const tuple = this;

		try {
			return normalizeElement(tuple[index], index >= tuple.length);
		} catch (innerCause) {
			innerCause.append(index).throw();
		}
	}

	return {
		[name]: (_tuple, _isEmpty) => {
			if (required && _isEmpty) {
				throwCause();
			}

			_tuple = _isEmpty ? Default() :_tuple;

			if (!Type.Object.Array(_tuple)) {
				throwCause(_tuple);
			}

			if (_tuple.length > length) {
				throwCause(_tuple);
			}

			const tuple = elementNormalizeList.map(toFinalElement, _tuple);

			try {
				modify(tuple);
			} catch (error) {
				throwCause(tuple, error);
			}

			return tuple;
		}
	}[name];
};