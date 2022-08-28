export const isInteger = any => Number.isInteger(any);
export const isInfinity = any => Number.isFinite(any);
export const isNaN = any => Number.isNaN(any);
export const isPort = any => isInteger(any) && any > 0 && any <= 65535;
export const isByte = any => isInteger(any) && any >= 0 && any <= 255;

export {
	isInteger as Integer,
	isPort as Port,
};