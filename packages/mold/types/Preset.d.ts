import { Schema } from './schema';

export const Constant: (value: any) => Schema;
export const Enum: (valueList: Array<any>) => Schema;
export const Null: Schema;
export const NotNull: Schema;
export const OrNull: (schema: Schema) => Schema;

export const Number: (defaultValue: number) => Schema;
export const String: (defaultValue: string) => Schema;
export const Boolean: (defaultValue: boolean) => Schema;
export const Function: (defaultValue: Function) => Schema;
export const Symbol: (defaultValue: symbol) => Schema;
export const Integer: (defaultValue: number) => Schema;