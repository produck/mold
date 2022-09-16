import { Schema } from './schema';

type DefaultValue = () => any | null;

interface ArraySchema {
	(itemSchema: Schema): Schema;
	(itemSchema: Schema, expected: string): Schema;
	(itemSchema: Schema, DefaultValue: DefaultValue): Schema;
	(itemSchema: Schema, expected: string, DefaultValue: DefaultValue): Schema;
}

type SchemaList = Array<Schema>;

interface TupleSchema {
	(schemaList: SchemaList): Schema;
	(schemaList: SchemaList, expected: string): Schema;
	(schemaList: SchemaList, DefaultValue: DefaultValue): Schema;
	(schemaList: SchemaList, expected: string, DefaultValue: DefaultValue): Schema;
}

type Validate = (any: any) => boolean;

interface ValueSchema {
	(
		validate: Validate,
		expected?: string,
		DefaultValue?: DefaultValue
	): Schema;

	(
		validate: Validate,
		DefaultValue?: DefaultValue
	): Schema;
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
	<CustomSchemaMap extends SchemaMap>(
		schemaMap: CustomSchemaMap,
		expected?: string,
		DefaultValue?: DefaultValue
	): Schema<CombinedObject<CustomSchemaMap>>;

	<CustomSchemaMap extends SchemaMap>(
		schemaMap: CustomSchemaMap,
		DefaultValue?: DefaultValue
	): Schema<CombinedObject<CustomSchemaMap>>;
}

export const Value: ValueSchema;
export const Object: ObjectSchema;
export const Array: ArraySchema;
export const Tuple: TupleSchema;