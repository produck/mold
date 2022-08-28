import * as Throw from './Throw.mjs';
import * as Type from './Type/index.mjs';
import * as Required from './Required.mjs';
import Asserter, * as Assert from './Assert.mjs';

const Normalizer = (DefaultOptions, execute) => {
	Assert.Function('Options')(DefaultOptions);
	Assert.Function('execute')(execute);

	return (_options) => {
		const defaultOptions = DefaultOptions();

		execute(defaultOptions, _options);

		return defaultOptions;
	};
};

export { Normalizer };