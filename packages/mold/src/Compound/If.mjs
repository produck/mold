import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';

export const If = (test, options) => {
	if (!Type.Native.Function(test)) {
		Utils.throwError('test', 'function');
	}

	if (!Type.Helper.PlainObjectLike(options)) {
		Utils.throwError('options', 'plain object');
	}

	if (!Type.Native.Function(options.then)) {
		Utils.throwError('options.then', 'function');
	}

	if (!Type.Native.Function(options.else)) {
		Utils.throwError('options.else', 'function');
	}

	return (_value, _empty) => {
		let branch = options.then;

		try {
			test(_value, _empty);
		} catch (error) {
			branch = options.else;
		}

		try {
			return branch(_value, _empty);
		} catch (error) {
			new Utils.MoldCause(_value)
				.setType('CompoundIf')
				.append({ then: branch === options.then })
				.throw(error);
		}
	};
};