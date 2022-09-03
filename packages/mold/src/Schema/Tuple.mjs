import { Cause, Type, Error, Options } from './Internal/index.mjs';

export const TupleSchema = (elementNormalizeList, options = {}) => {
	Options.assert(options);

	if (!Type.Array(elementNormalizeList)) {
		Error.ThrowMoldError('elementNormalizeList', 'array');
	}

	elementNormalizeList.forEach((normalize, index) => {
		if (!Type.Function(normalize)) {
			Error.ThrowMoldError(`elementNormalizeList[${index}]`, 'function');
		}
	});

	const {
		name = 'Tuple',
		expected = `array(${length})`,
		Default = () => [],
		modify = () => {}
	} = options;

	const length = elementNormalizeList.length;
	const required = Type.Null(Default);
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

			if (!Type.Array(_tuple)) {
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