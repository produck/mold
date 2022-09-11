const TypeOf = (any, typeName) => typeof any === typeName;

const isUndefined = any => TypeOf(any, 'undefined');
const isNumber = any => TypeOf(any, 'number');
const isString = any => TypeOf(any, 'string');
const isBoolean = any => TypeOf(any, 'boolean');
const isFunction = any => TypeOf(any, 'function');
const isObject = any => TypeOf(any, 'object');
const isSymbol = any => TypeOf(any, 'symbol');
const isBigInt = any => TypeOf(any, 'bigint');

export {
	isUndefined as Undefined,
	isNumber as Number,
	isString as String,
	isBoolean as Boolean,
	isFunction as Function,
	isObject as Object,
	isSymbol as Symbol,
	isBigInt as BigInt,
};