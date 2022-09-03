export class MoldError extends Error {
	constructor(message) {
		super(message);
		this.name = 'MoldError';
	}
}