import * as Type from './Type/index.mjs';
import * as Utils from './Utils/index.mjs';
import * as Catcher from './Catcher/index.mjs';

const assertSchema = any => {
	if (!Type.Native.Function(any)) {
		Utils.throwError('schema', 'function');
	}
};

export const Normalizer = (schema, catcher = Catcher.Simple) => {
	assertSchema(schema);

	if (!Type.Native.Function(catcher)) {
		Utils.throwError('caught', 'function');
	}

	return (...args) => {
		try {
			return schema(args[0], args.length === 0);
		} catch (cause) {
			return catcher(cause);
		}
	};
};

export const Validator = schema => {
	assertSchema(schema);

	return any => {
		try {
			schema(any, false);

			return true;
		} catch {
			return false;
		}
	};
};

const UNDEFINED = Symbol.for('Mold::Undefined');

export const Typer = () => UNDEFINED;
