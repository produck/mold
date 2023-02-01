import { Schema } from './schema';

export const Undefined: (required?: boolean) => Schema<undefined>;
export const Any: (defaultValue?: any) => Schema<any>;

export const Constant: <Type>(
	value: Type,
	required?: boolean
) => Schema<Type>;

export const Enum: <Type>(
	valueList: Array<Type>,
	defaultIndex?: number | null
) => Schema<Type>;

export const Null: (required?: boolean) => Schema<null>;
export const NotNull: Schema<Exclude<any, null>>;

export const OrNull: <
	CustomSchema extends Schema = Schema
>(
	schema: CustomSchema,
	required?: boolean
) => CustomSchema | Schema<null>;

export const Instance: <
	CustomConstructor extends abstract new (...args: any[]) => any
>(
	/**
	 * Anything can be used as a constructor
	 */
	Constructor: CustomConstructor
) => Schema<InstanceType<CustomConstructor>>

type NativeSchema<Type = any> = (
	/**
	 * No default value means required.
	 */
	defaultValue?: Type
) => Schema<Type>

type NumberNativeSchema = NativeSchema<number>;
type Edge = number | [number];

export const Number: NumberNativeSchema;
export const NumberRange: (min?: Edge, max?: Edge) => NumberNativeSchema;
export const Integer: NumberNativeSchema;
export const IntegerMultipleOf: (base: number) => NumberNativeSchema;

export const Port: NumberNativeSchema;
export const INT8: NumberNativeSchema;
export const UINT8: NumberNativeSchema;
export const INT16: NumberNativeSchema;
export const UINT16: NumberNativeSchema;
export const INT24: NumberNativeSchema;
export const UINT24: NumberNativeSchema;
export const INT32: NumberNativeSchema;
export const UINT32: NumberNativeSchema;
export const Byte: NumberNativeSchema;

export const String: NativeSchema<string>;
export const StringPattern: (pattern: RegExp, name?: string) => NativeSchema<string>;
export const StringLength: (min: number, max?: number) => NativeSchema<string>;

export const Boolean: NativeSchema<boolean>;
export const Function: NativeSchema<Function>;
export const Symbol: NativeSchema<symbol>;
