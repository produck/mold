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
	const cause = new Cause(required, expected);

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
			cause.clear();

			if (required && _isEmpty) {
				cause.throw();
			}

			_tuple = _isEmpty ? Default() :_tuple;

			if (!Type.Object.Array(_tuple)) {
				cause.throw();
			}

			if (_tuple.length > length) {
				cause.throw();
			}

			const tuple = elementNormalizeList.map(toFinalElement, _tuple);

			modify(tuple);

			return tuple;
		}
	}[name];
};