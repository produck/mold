import { Schema } from './schema';

type DefaultValue = () => any | null;

interface ArraySchema {
	<CustomSchema extends Schema = Schema<any>>(
		itemSchema: CustomSchema,
		expected?: string,
		DefaultValue?: DefaultValue
	): Schema<Array<ReturnType<CustomSchema>>>;

	<CustomSchema extends Schema = Schema<any>>(
		itemSchema: CustomSchema,
		DefaultValue: DefaultValue
	): Schema<Array<ReturnType<CustomSchema>>>;
}

type SchemaTuple<S extends Schema = Schema> = []
| [S] | [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S]
| [S, S] | [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S]
| [S, S, S] | [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S]
| [S, S, S, S] | [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S]
| [S, S, S, S, S] | [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S]
| [S, S, S, S, S, S] | [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S]
| [S, S, S, S, S, S, S] | [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S]
| [S, S, S, S, S, S, S, S] | [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S]
| [S, S, S, S, S, S, S, S, S] | [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S]
| [S, S, S, S, S, S, S, S, S, S] | [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S]
| [S, S, S, S, S, S, S, S, S, S, S] | [S, S, S, S, S, S, S, S, S, S, S, S, S, S]
| [S, S, S, S, S, S, S, S, S, S, S, S] | [S, S, S, S, S, S, S, S, S, S, S, S, S]
| [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S]
| [S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S];

type CombinedTuple<
	CustomSchemaTuple extends SchemaTuple
> = {
	[Index in keyof CustomSchemaTuple]: ReturnType<CustomSchemaTuple[Index]>
};

interface TupleSchema {
	<CustomSchemaTuple extends SchemaTuple>(
		schemaList: CustomSchemaTuple,
		expected?: string,
		DefaultValue?: DefaultValue
	): Schema<CombinedTuple<CustomSchemaTuple>>;

	<CustomSchemaTuple extends SchemaTuple>(
		schemaList: CustomSchemaTuple,
		DefaultValue: DefaultValue
	): Schema<CombinedTuple<CustomSchemaTuple>>;
}

type Validate<Type = any> = (any: Type) => boolean;

interface ValueSchema {
	<CustomValidate extends Validate>(
		validate: CustomValidate,
		expected?: string,
		DefaultValue?: DefaultValue
	): CustomValidate extends Validate<infer V> ? Schema<V> : never;

	<CustomValidate extends Validate>(
		validate: CustomValidate,
		DefaultValue: DefaultValue
	): CustomValidate extends Validate<infer V> ? Schema<V>: never;
}

interface SchemaMap {
	[key: string]: Schema;
}

type CombinedObject<
	CustomSchemaMap extends SchemaMap
> = {
	[Property in keyof CustomSchemaMap]: ReturnType<CustomSchemaMap[Property]>
}

interface ObjectSchema {
	<CustomSchemaMap extends SchemaMap = {}>(
		schemaMap?: CustomSchemaMap,
		expected?: string,
		DefaultValue?: DefaultValue
	): Schema<CombinedObject<CustomSchemaMap>>;

	<CustomSchemaMap extends SchemaMap>(
		schemaMap: CustomSchemaMap,
		DefaultValue: DefaultValue
	): Schema<CombinedObject<CustomSchemaMap>>;
}

export const Value: ValueSchema;
export const Object: ObjectSchema;
export const Array: ArraySchema;
export const Tuple: TupleSchema;