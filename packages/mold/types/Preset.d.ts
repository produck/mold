import { Schema } from './schema';

export const Constant: <Type>(value: Type) => Schema<Type>;
export const Enum: (valueList: Array<any>) => Schema;

export const Null: Schema<null>;
export const NotNull: Schema<NonNullable<any>>;

export const OrNull: <
	CustomSchema extends Schema = Schema
>(
	schema: CustomSchema
) => CustomSchema | Schema<null>;

export const Instance: <
	CustomConstructor extends abstract new (...args) => any
>(
	/**
	 * Anything can be used as a constructor
	 */
	Constructor: CustomConstructor
) => Schema<InstanceType<CustomConstructor>>

export namespace Type {
	const Number: (defaultValue?: number) => Schema<number>;
	const String: (defaultValue?: string) => Schema<string>;
	const Boolean: (defaultValue?: boolean) => Schema<boolean>;
	const Function: (defaultValue?: Function) => Schema<Function>;
	const Symbol: (defaultValue?: symbol) => Schema<symbol>;
	const Integer: (defaultValue?: number) => Schema<number>;
}