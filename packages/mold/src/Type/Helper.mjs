import * as Native from './Native.mjs';

const InstanceOf = (any, constructor) => any instanceof constructor;
const isNull = any => any === null;
const isArray = any => Array.isArray(any);

const isPlainObjectLike = any => {
	return Native.Object(any) && !isNull(any) && !isArray(any);
};

const isRegExp = any => InstanceOf(any, RegExp);
const isError = any => InstanceOf(any, Error);
const isInteger = any => Number.isInteger(any);

export {
	isInteger as Integer,
	isNull as Null,
	isArray as Array,
	isRegExp as RegExp,
	isError as Error,
	isPlainObjectLike as PlainObjectLike,
};