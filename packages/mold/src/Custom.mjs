const DEFAULT_PROXY = next => next();

export const Custom = (schema, proxy = DEFAULT_PROXY) => {
	return (_value, _empty) => {
		const next = () => schema(_value, _empty);

		return proxy(_value, _empty, next);
	};
};
