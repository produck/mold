const isType = (any, typeName) => typeof any === typeName;

const isObject = any => isType(any, 'object');
const isNumber = any => isType(any, 'number');
const isFunction = any => isType(any, 'function');
const isString = any => isType(any, 'string');

export {
	isFunction as Function,
	isString as String,
	isNumber as Number,
};