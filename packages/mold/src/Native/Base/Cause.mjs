export class MoldCause {
	constructor(required, expected, value) {
		this.type = 'Base';
		this.detail = null;

		this.required = required;
		this.expected = expected;
		this.value = value;

		this.next = null;
	}

	write(type, detail = null) {
		this.type = type;
		this.detail = detail;

		return this;
	}

	throw(next = null) {
		this.next = next;

		throw this;
	}
}