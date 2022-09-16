export interface Schema<ValueType = any> {
	(_value: any, _empty: boolean): ValueType;
}
