export class MoldCause {
	constructor(value) {
		this.type = 'Abstract';
		this.detail = {};

		this.value = value;
		this.next = null;
	}

	setType(typeName) {
		this.type = typeName;

		return this;
	}

	append(detail) {
		Object.assign(this.detail, detail);

		return this;
	}

	throw(next = null) {
		this.next = next;

		throw Object.freeze(this);
	}
}