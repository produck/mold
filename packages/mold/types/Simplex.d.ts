import { Schema } from './schema';

type DefaultValue = () => any | null;

interface ArrayOptionsObject<
	CustomSchema extends Schema = Schema
> {
	items?: CustomSchema;
	minLength?: number;
	maxLength?: number;
	key?: (item?: any, index?: number) => any;
}

type ArrayOptions<
	CustomSchema extends Schema = Schema
> = ArrayOptionsObject<CustomSchema> | Schema;

type ArrayItemSchemaType<
	CustomSchemaOptions extends ArrayOptions
> = CustomSchemaOptions extends ArrayOptionsObject<infer S>
	? ReturnType<S> : CustomSchemaOptions extends Schema
		? ReturnType<CustomSchemaOptions>
		: never;

interface ArraySchema {
	<CustomArrayOptions extends ArrayOptions = {}>(
		options: CustomArrayOptions,
		expected?: string,
		DefaultValue?: DefaultValue
	): Schema<Array<ArrayItemSchemaType<CustomArrayOptions>>>;

	<CustomArrayOptions extends ArrayOptions = {}>(
		options: CustomArrayOptions,
		DefaultValue: DefaultValue
	): Schema<Array<ArrayItemSchemaType<CustomArrayOptions>>>;
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
	[Index in keyof CustomSchemaTuple]: ReturnType<CustomSchemaTuple[Index]>;
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
	[key: string | symbol]: Schema;
}

type CombinedObject<
	CustomSchemaMap extends SchemaMap
> = {
	[Property in keyof CustomSchemaMap]: ReturnType<CustomSchemaMap[Property]>;
} & {
	[key: string]: ReturnType<CustomSchemaMap[symbol]>
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
