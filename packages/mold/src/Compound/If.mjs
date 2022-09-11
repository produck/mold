import * as Native from '../Native/index.mjs';

export const If = (test, options) => {
	return (_value, _empty) => {
		let branch;

		try {
			test(_value, _empty);
			branch = options.then;
		} catch (error) {
			branch = options.else;
		}

		try {
			return branch(_value, _empty);
		} catch (error) {
			new Native.Base.MoldCause(_value)
				.setType('CompoundIf')
				.append({ then: branch === options.then })
				.throw(error);
		}
	};
};