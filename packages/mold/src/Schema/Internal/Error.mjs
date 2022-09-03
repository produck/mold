export class MoldError extends Error {
	constructor(message) {
		super(message);
		this.name = 'MoldError';
	}
}

export const Throw = message => {
	throw new MoldError(message);
};

export const Message = (role, expected) => {
	return `Invalid "${role}", 1 "${expected}" expected.`;
};

export const ThrowMoldError = (role, expected) => {
	Throw(Message(role, expected));
};