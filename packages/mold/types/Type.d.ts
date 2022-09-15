type Validate = (any: any) => boolean;

export namespace Native {
	const Undefined: Validate;
	const Number: Validate;
	const String: Validate;
	const Boolean: Validate;
	const Function: Validate;
	const Object: Validate;
	const Symbol: Validate;
	const BigInt: Validate;
}

export namespace Helper {
	const Null: Validate;
	const Array: Validate;
	const PlainObjectLike: Validate;
}

export namespace Number {
	const Integer: Validate;
	const Infinity: Validate;
	const NaN: Validate;
}

export namespace Object {
	const RegExp: Validate;
	const Date: Validate;
	const Array: Validate;
	const Error: Validate;
	const Map: Validate;
	const Set: Validate;
	const WeakMap: Validate;
	const WeakSet: Validate;
	const Promise: Validate;
}