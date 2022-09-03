export class MoldSchemaError extends Error {
	constructor(message) {
		super(message);
		this.name = 'MoldSchemaError';
	}
}

export const Throw = message => {
	throw new MoldSchemaError(message);
};

export const Message = (role, expected) => {
	return `Invalid "${role}", 1 "${expected}" expected.`;
};

export const ThrowMoldError = (role, expected) => {
	Throw(Message(role, expected));
};