import { Schema } from './schema';

interface NotSchema {
	(targetSchema: Schema): Schema;
}

type SchemaList = Array<Schema>;

interface AndSchema {
	(andSchemaList: SchemaList): Schema;
}

interface OrSchema {
	(orSchemaList: SchemaList): Schema;
}

interface IfOptions {
	then: Schema;
	else: Schema;
}

interface IfSchema {
	(test: Schema, options: IfOptions): Schema;
}

export const Not: NotSchema;
export const And: AndSchema;
export const Or: OrSchema;
export const If: IfSchema;