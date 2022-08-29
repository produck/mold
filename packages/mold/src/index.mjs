import * as Throw from './Throw.mjs';
import * as Type from './Type/index.mjs';
import * as Required from './Required.mjs';
import Asserter, * as Assert from './Assert.mjs';

const assertDefault = Assert.Function('DefaultOptions');
const assertExecute = Assert.Function('execute');
const assertName = Assert.String('name');

const Normalizer = (Default, execute, name = '') => {
	assertDefault(Default);
	assertExecute(execute);
	assertName(name);

	return (_options) => {
		const defaultOptions = Default(_options);

		execute(defaultOptions, _options);

		return defaultOptions;
	};
};

export default Normalizer;

export {
	Normalizer,
	Throw, Type, Required,
	Asserter, Assert
};