import { Schema } from './schema';

import * as Type from './Type';
export { Type, Type as T };

import * as Simplex from './Simplex';
export { Simplex, Simplex as Simp, Simplex as S };

import * as Compound from './Compound';
export { Compound, Compound as Comp, Compound as C };

import * as Preset from './Preset';
export { Preset, Preset as Pre, Preset as P };

import * as Message from './Message';
export { Message };

type CircularProxy = (reference: Schema) => void;

interface CircularSchema {
	(proxy: CircularProxy): Schema;
}

type CustomProxy = (_value: any, _empty: boolean, next: () => any) => any;

interface CustomSchema {
	(schema: Schema, proxy?: CustomProxy): Schema;
}

interface normalize {
	(_value: any): any;
}

interface Normalizer {
	(schema: Schema, caught?: Function): normalize;
}

export const Circular: CircularSchema;
export const Custom: CustomSchema;
export const Normalizer: Normalizer;
