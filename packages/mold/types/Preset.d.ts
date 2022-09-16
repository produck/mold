import { Schema } from './schema';

export const Constant: (value: any) => Schema;
export const Enum: (valueList: Array<any>) => Schema;
export const Null: Schema<null>;
export const NotNull: Schema<any>;
export const OrNull: (schema: Schema) => Schema;

export const Number: (defaultValue?: number) => Schema<number>;
export const String: (defaultValue?: string) => Schema<string>;
export const Boolean: (defaultValue?: boolean) => Schema<boolean>;
export const Function: (defaultValue?: Function) => Schema<Function>;
export const Symbol: (defaultValue?: symbol) => Schema<symbol>;
export const Integer: (defaultValue?: number) => Schema<number>;