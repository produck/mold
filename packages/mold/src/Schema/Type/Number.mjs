const isInteger = any => Number.isInteger(any);
const isInfinity = any => Number.isFinite(any);
const isNaN = any => Number.isNaN(any);
const isPort = any => isInteger(any) && any > 0 && any <= 65535;
const isByte = any => isInteger(any) && any >= 0 && any <= 255;

export {
	isInteger as Integer,
	isInfinity as Infinity,
	isNaN as NaN,
	isPort as Port,
	isByte as Byte,
};