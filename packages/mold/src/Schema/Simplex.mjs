import { Cause, Type, Error } from './Internal/index.mjs';

const Role = principal => `SimplexSchema() -> ${principal}`;

export const SimplexSchema = (validate, expected, Default = null) => {
	if (!Type.Function(validate)) {
		Error.ThrowMoldError(Role('validate'), 'function');
	}

	if (!Type.String(expected)) {
		Error.ThrowMoldError(Role('expected'), 'string');
	}

	if (!Type.Function(Default) && !Type.Null(Default)) {
		Error.ThrowMoldError(Role('Default'), 'function or null');
	}

	const required = Type.Function(Default);
	const cause = new Cause(required, expected);

	return (_value, _empty = false) => {
		cause.clear();

		if (required && _empty) {
			cause.throw();
		}

		const value = _empty ? Default() : _value;

		if (!validate(value)) {
			cause.throw();
		}

		return value;
	};
};