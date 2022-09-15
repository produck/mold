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
	(validate: Validate): Schema;
	(validate: Validate, expected: string): Schema;
	(validate: Validate, DefaultValue: DefaultValue): Schema;
	(validate: Validate, expected: string, DefaultValue: DefaultValue): Schema;
}

interface SchemaMap {
	[key: string]: Schema;
}

interface ObjectSchema {
	(schemaMap: SchemaMap): Schema;
	(schemaMap: SchemaMap, expected: string): Schema;
	(schemaMap: SchemaMap, DefaultValue: DefaultValue): Schema;
	(schemaMap: SchemaMap, expected: string, DefaultValue: DefaultValue): Schema;
}

export const Value: ValueSchema;
export const Object: ObjectSchema;
export const Array: ArraySchema;
export const Tuple: TupleSchema;