const InstanceOf = (any, constructor) => any instanceof constructor;

const isRegExp = any => InstanceOf(any, RegExp);
const isDate = any => InstanceOf(any, Date);
const isArray = any => Array.isArray(any);
const isError = any => InstanceOf(any, Error);
const isMap = any => InstanceOf(any, Map);
const isSet = any => InstanceOf(any, Set);
const isWeakMap = any => InstanceOf(any, WeakMap);
const isWeakSet = any => InstanceOf(any, WeakSet);
const isPromise = any => InstanceOf(any, Promise);

export {
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