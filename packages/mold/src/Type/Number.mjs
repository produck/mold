const NUMBER = Number;

const isInteger = any => NUMBER.isInteger(any);
const isInfinity = any => NUMBER.isFinite(any);
const isNaN = any => NUMBER.isNaN(any);

export {
	isInteger as Integer,
	isInfinity as Infinity,
	isNaN as NaN,
};