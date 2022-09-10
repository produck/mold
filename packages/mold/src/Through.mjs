

export const Through = (schema, proxy) => {
	return (_value, _empty) => {
		const value = schema(_value, _empty);
	};
};
