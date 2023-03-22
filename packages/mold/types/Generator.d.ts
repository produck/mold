import { Schema } from './schema';

interface Normalizer<Type> {
	(_value: Type): Type;
}

interface NormalizerConstructor {
	<CustomSchema extends Schema>(
		schema: CustomSchema,
		caught?: Function
	): Normalizer<ReturnType<CustomSchema>>;
}

export const Normalizer: NormalizerConstructor;
export function Validator(schema: Schema): boolean;

export function Typer<
	CustomSchema extends Schema
>(schema: CustomSchema): ReturnType<CustomSchema>
