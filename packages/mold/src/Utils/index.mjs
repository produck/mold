export { MoldCause } from './Cause.mjs';

export const throwError = (role, expected) => {
	throw new TypeError(`Invalid "${role}", one "${expected}" expected.`);
};
