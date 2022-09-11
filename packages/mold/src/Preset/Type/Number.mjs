const isInteger = any => Number.isInteger(any);
const isInfinity = any => Number.isFinite(any);
const isNaN = any => Number.isNaN(any);

export {
	isInteger as Integer,
	isInfinity as Infinity,
	isNaN as NaN,
};