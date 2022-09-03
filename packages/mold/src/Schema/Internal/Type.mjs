const isType = (any, typeName) => typeof any === typeName;

const isUndefined = any => isType(any, 'undefined');
const isNumber = any => isType(any, 'number');
const isString = any => isType(any, 'string');
const isBoolean = any => isType(any, 'boolean');
const isFunction = any => isType(any, 'function');
const isObject = any => isType(any, 'object');
const isSymbol = any => isType(any, 'symbol');
const isBigInt = any => isType(any, 'bigint');

const isNull = any => any === null;
const isArray = any => Array.isArray(any);

const isPlainObjectLike = any => {
	return isObject(any) && !isNull(any) && !isArray(any);
};

export {
	isUndefined as Undefined,
	isNumber as Number,
	isString as String,
	isBoolean as Boolean,
	isFunction as Function,
	isObject as Object,
	isSymbol as Symbol,
	isBigInt as BigInt,
	isNull as Null,
	isArray as Array,
	isPlainObjectLike as PlainObjectLike
};