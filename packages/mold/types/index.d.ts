import { Schema } from './schema';

import * as Type from './Type';
export { Type, Type as T };

import * as Simplex from './Simplex';
export { Simplex, Simplex as Simp, Simplex as S };

import * as Compound from './Compound';
export { Compound, Compound as Comp, Compound as C };

import * as Preset from './Preset';
export { Preset, Preset as Pre, Preset as P };

export namespace Catcher {
	const Origin: () => {};
	const Simple: () => {};
}

type CircularProxy<
	CustomSchema extends Schema
> = (
	self: CustomSchema
) => CustomSchema

interface CircularSchema {
	<
		CustomCircularProxy extends CircularProxy<Schema>
	>(
		proxy: CustomCircularProxy
	): ReturnType<CustomCircularProxy>;
}

interface CustomSchema {
	<CustomSchema extends Schema>(
		schema: CustomSchema,
		proxy?: (
			_value: ReturnType<CustomSchema>,
			_empty: boolean,
			next: () => ReturnType<CustomSchema>
		) => any
	): CustomSchema;
}

interface Normalizer<Type> {
	(_value: Type): Type;
}

interface NormalizerConstructor {
	<CustomSchema extends Schema>(
		schema: CustomSchema,
		caught?: Function
	): Normalizer<ReturnType<CustomSchema>>;
}

export const Circular: CircularSchema;
export const Circ: CircularSchema;

export const Custom: CustomSchema;
export const Cust: CustomSchema;

export const Normalizer: NormalizerConstructor;
