import * as Native from './Native.mjs';

const isInstance = (any, constructor) => any instanceof constructor;

const isNull = any => any === null;

const isPlainObjectLike = any => {
	return Native.Object(any) && !isNull(any) && !isArray(any);
};

const isRegExp = any => isInstance(any, RegExp);
const isDate = any => isInstance(any, Date);
const isArray = any => Array.isArray(any);
const isError = any => isInstance(any, Error);
const isMap = any => isInstance(any, Map);
const isSet = any => isInstance(any, Set);
const isWeakMap = any => isInstance(any, WeakMap);
const isWeakSet = any => isInstance(any, WeakSet);
const isPromise = any => isInstance(any, Promise);

export {
	isNull as Null,
	isPlainObjectLike as PlainLike,
	isRegExp as RegExp,
	isDate as Date,
	isArray as Array,
	isError as Error,
	isMap as Map,
	isSet as Set,
	isWeakMap as WeakMap,
	isWeakSet as WeakSet,
	isPromise as Promise
};