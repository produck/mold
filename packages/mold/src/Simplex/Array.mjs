import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';
import { SimplexSchema } from './Schema.mjs';
import { OptionsParser } from './OptionsParser.mjs';

const parseOptions = OptionsParser('array', () => []);

const DEFAULT_OPTIONS = {
	items: any => any,
	minLength: 0,
	maxLength: Number.MAX_SAFE_INTEGER,
	key: (_item, index) => index
};

const parseArrayOptions = (_options) => {
	const isSchema = Type.Native.Function(_options);
	const isOptions = Type.Helper.PlainObjectLike(_options);

	if (!isSchema && !isOptions) {
		Utils.throwError('options', 'function or object');
	}

	if (isSchema) {
		return { ...DEFAULT_OPTIONS, items: _options };
	}

	const finalOptions = { ...DEFAULT_OPTIONS };

	const {
		items: _items = DEFAULT_OPTIONS.items,
		minLength: _minLength = DEFAULT_OPTIONS.minLength,
		maxLength: _maxLength = DEFAULT_OPTIONS.maxLength,
		key: _key = DEFAULT_OPTIONS.key
	} = _options;

	if (!Type.Native.Function(_items)) {
		Utils.throwError('.items', 'function');
	}

	if (!Type.Helper.Integer(_minLength) || _minLength < 0) {
		Utils.throwError('.minLength', 'integer >= 0');
	}

	if (!Type.Helper.Integer(_maxLength) || _maxLength < _minLength) {
		Utils.throwError('.maxLength', 'integer >= minLength');
	}

	if (!Type.Native.Function(_key)) {
		Utils.throwError('.key', 'function');
	}

	finalOptions.items = _items;
	finalOptions.minLength = _minLength;
	finalOptions.maxLength = _maxLength;
	finalOptions.key = _key;

	return finalOptions;
};

export const ArraySchema = (options = DEFAULT_OPTIONS, ...schemaOptions) => {
	const { items, minLength, maxLength, key } = parseArrayOptions(options);
	const finalOptions = parseOptions(schemaOptions);
	const DETAILS = { minLength, maxLength };

	return SimplexSchema((_array, _empty, cause) => {
		_array = _empty ? finalOptions.DefaultValue() : _array;

		if (!Type.Helper.Array(_array)) {
			cause.setType('Value').throw();
		}

		const length = _array.length;

		if (length < minLength || length > maxLength) {
			cause.setType('ArrayLength').append({ ...DETAILS }).throw();
		}

		const set = new Set();

		const value = _array.map((_item, index) => {
			try {
				return items(_item);
			} catch (error) {
				cause.setType('ArrayItem').append({ index }).throw(error);
			}
		});

		value.forEach((item, index) => {
			const keyValue = key(item, index);

			if (set.has(keyValue)) {
				cause.setType('ArrayKey').append({ index }).throw();
			}

			set.add(keyValue);

			return item;
		});

		return value;
	}, ...finalOptions.toSchemaArgs());
};
