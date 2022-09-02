import { Schema } from './Schema.mjs';

const NumberSchema = Schema();
const StringSchema = Schema();
const BooleanSchema = Schema();
const SymbolSchema = Schema();
const FunctionSchema = Schema();
const ObjectSchema = Schema();
const ArraySchema = Schema();

export {
	NumberSchema as Number,
	StringSchema as String,
	BooleanSchema as Boolean,
	SymbolSchema as Symbol,
	FunctionSchema as Function,
	ObjectSchema as Object,
	ArraySchema as Array,
};