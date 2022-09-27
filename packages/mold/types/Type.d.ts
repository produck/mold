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
	const RegExp: Validate<RegExp>;
	const Error: Validate<Error>;
	const Integer: Validate<number>;
}
