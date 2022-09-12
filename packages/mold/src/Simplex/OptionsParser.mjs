import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';

const isDefaultValue = any => Type.Native.Function(any) || Type.Helper.Null(any);

export const OptionsParser = (expected = 'valid value', DefaultValue = null) => {
	return _options => {
		const length = _options.length;

		if (length > 2) {
			Utils.throwError('options', 'tuple(length<=2)');
		}

		const options = {
			expected,
			DefaultValue,
			toSchemaArgs: () => [
				options.expected,
				Type.Helper.Null(options.DefaultValue)
			]
		};

		const [_0, _1] = _options;

		if (length === 1) {
			if (!Type.Native.String(_0) && !isDefaultValue(_0)) {
				Utils.throwError('options[0]', 'string or function');
			}

			if (Type.Native.String(_0)) {
				options.expected = _0;
			}

			if (isDefaultValue(_0)) {
				options.DefaultValue = _0;
			}
		}

		if (length === 2) {
			if (!Type.Native.String(_0)) {
				Utils.throwError('options[0]', 'string');
			}

			if (!isDefaultValue(_1)) {
				Utils.throwError('options[1]', 'function or null');
			}

			options.expected = _0;
			options.DefaultValue = _1;
		}

		return options;
	};
};