import { Schema } from './schema';

interface NotSchema {
	(targetSchema: Schema): Schema;
}

type SchemaList = Array<Schema>;

type MixinedObject<
	CustomSchemaList extends SchemaList
> = ReturnType<CustomSchemaList[0]>
	| ReturnType<CustomSchemaList[1]>
	| ReturnType<CustomSchemaList[2]>
	| ReturnType<CustomSchemaList[3]>

interface AndSchema {
	<CustomSchemaList extends SchemaList>(
		andSchemaList: CustomSchemaList
	): Schema<MixinedObject<CustomSchemaList>>;
}

interface OrSchema {
	<CustomSchemaList extends SchemaList>(
		orSchemaList: CustomSchemaList
	): Schema<MixinedObject<CustomSchemaList>>;
}

interface IfOptions {
	then: Schema;
	else: Schema;
}

interface IfSchema {
	<O extends IfOptions>(
		test: Schema,
		options: O
	): Schema<ReturnType<O["then"]> | ReturnType<O["else"]>>;
}

export const Not: NotSchema;
export const And: AndSchema;
export const Or: OrSchema;
export const If: IfSchema;