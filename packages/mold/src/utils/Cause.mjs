export class MoldCauseError extends Error {
	constructor(required, expected) {
		super('');

		this.name = 'MoldCauseError';

		this.required = required;
		this.expected = expected;

		this.value = undefined;
		this.more = null;

		this.path = [];
	}

	append(key, type) {
		this.path.unshift({ key, type });

		return this;
	}

	occur(value, more = null) {
		this.value = value;
		this.more = more;

		return this;
	}

	throw() {
		throw this;
	}
}

export const Thrower = (required, expected) => {
	return (value = undefined, more = null) => {
		return new MoldCauseError(required, expected)
			.occur(value, more).throw();
	};
};