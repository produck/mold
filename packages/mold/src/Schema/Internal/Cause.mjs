export class Cause {
	constructor(required, expected) {
		this.required = required;
		this.expected = expected;
		this.path = [];
		Object.freeze(this);
	}

	clear() {
		this.path.splice(0);

		return this;
	}

	append(node) {
		this.path.unshift(node);

		return this;
	}

	throw() {
		throw this;
	}
}