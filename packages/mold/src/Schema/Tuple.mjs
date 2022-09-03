import { Cause, Type, Error } from './Internal/index.mjs';

const Role = principal => `TupleSchema() -> ${principal}`;

export const TupleSchema = (elementNormalizeList, options = {}) => {
	if (!Type.Array(elementNormalizeList)) {
		Error.ThrowMoldError(Role('elementNormalizeList'), 'array');
	}

	if (!Type.PlainObjectLike(options)) {
		Error.ThrowMoldError(Role('options'), 'plain object');
	}

	elementNormalizeList.forEach((normalize, index) => {
		if (!Type.Function(normalize)) {
			Error.ThrowMoldError(Role(`elementNormalizeList[${index}]`), 'function');
		}
	});

	const { required = false, expected = `array(length=${length})` } = options;

	if (!Type.Boolean(required)) {
		Error.ThrowMoldError(Role('options.required'), 'boolean');
	}

	if (!Type.String(expected)) {
		Error.ThrowMoldError(Role('options.expected'), 'string');
	}

	const length = elementNormalizeList.length;
	const cause = new Cause(required, expected);

	function toFinalElement(normalizeElement, index) {
		const tuple = this;

		try {
			return normalizeElement(tuple[index], index >= tuple.length);
		} catch (innerCause) {
			innerCause.append(index).throw();
		}
	}

	return (_tuple, _isEmpty) => {
		cause.clear();

		if (required && _isEmpty) {
			cause.throw();
		}

		_tuple = _isEmpty ? [] :_tuple;

		if (!Type.Array(_tuple)) {
			cause.throw();
		}

		if (_tuple.length > length) {
			cause.throw();
		}

		return elementNormalizeList.map(toFinalElement, _tuple);
	};
};