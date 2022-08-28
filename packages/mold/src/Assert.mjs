import * as Type from './Type/index.mjs';
import throwError, * as Throw from './Throw.mjs';

const TypeErrorMessage = (role, want) => `Invalid ${role}, ${want} expected.`;

class MoldTypeError extends TypeError {
	constructor(message) {
		super(message);
		this.name = 'MoldTypeError';
	}
}

const Asserter = (check, role, want) => {
	if (!Type.Simple.Function(check)) {
		throwError(TypeErrorMessage('check', 'a function'), MoldTypeError);
	}

	if (!Type.Simple.String(role)) {
		throwError(TypeErrorMessage('role', 'a string'), MoldTypeError);
	}

	if (!Type.Simple.String(want)) {
		throwError(TypeErrorMessage('want', 'a string'), MoldTypeError);
	}

	return (any) => {
		if (!check(any)) {
			Throw.TypeError(TypeErrorMessage(role, want));
		}
	};
};

export default Asserter;

const assertFunction = (role, want = 'a function') => Asserter(Type.Simple.Function, role, want);
const assertString = (role, want = 'a string') => Asserter(Type.Simple.String, role, want);

export {
	assertFunction as Function,
	assertString as String
};