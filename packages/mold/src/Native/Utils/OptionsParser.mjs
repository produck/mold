import * as Base from '../Base/index.mjs';
import * as Type from './Type.mjs';

export const OptionsParser = (expected = 'value', DefaultValue = null) => {
	return _options => {
		const length = _options.length;

		if (length > 2) {
			Base.throwError('options', 'tuple(length<=2)');
		}

		const options = {
			expected,
			DefaultValue,
			toSchemaArgs: () => [options.expected, Type.isNull(this.DefaultValue)]
		};

		const [_0, _1] = _options;

		if (length === 1) {
			if (Base.Type.String(_0)) {
				options.expected = _0;
			}

			if (Base.Type.Function(_0)) {
				options.DefaultValue = _0;
			}

			Base.throwError('options[0]', 'string or function');
		}

		if (length === 2) {
			if (!Base.Type.String(_0)) {
				Base.throwError('options[0]', 'string');
			}

			if (!Base.Type.Function(_1) && !Type.isNull(_1)) {
				Base.throwError('options[1]', 'function or null');
			}

			options.expected = _0;
			options.DefaultValue = _1;
		}

		return options;
	};
};