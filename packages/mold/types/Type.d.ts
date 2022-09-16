type Validate<Type = any> = (any: Type) => boolean;

export namespace Native {
	const Undefined: Validate<undefined>;
	const Number: Validate<number>;
	const String: Validate<string>;
	const Boolean: Validate<boolean>;
	const Function: Validate<Function>;
	const Object: Validate<object>;
	const Symbol: Validate<symbol>;
	const BigInt: Validate<bigint>;
}

export namespace Helper {
	const Null: Validate<null>;
	const Array: Validate<Array<any>>;
	const PlainObjectLike: Validate<object>;
}

export namespace Number {
	const Integer: Validate<number>;
	const Infinity: Validate<number>;
	const NaN: Validate<number>;
}

export namespace Object {
	const RegExp: Validate<RegExp>;
	const Date: Validate<Date>;
	const Array: Validate<Array<any>>;
	const Error: Validate<Error>;
	const Map: Validate<Map<any, any>>;
	const Set: Validate<Set<any>>;
	const WeakMap: Validate<WeakMap<any, any>>;
	const WeakSet: Validate<WeakSet<any>>;
	const Promise: Validate<Promise<any>>;
}