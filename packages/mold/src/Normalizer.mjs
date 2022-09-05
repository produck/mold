import * as Type from './Type/index.mjs';

export const SimpleCauseMessage = cause => {
	const pathSectionList = [];

	for (const key of cause.path) {
		if (Type.Native.String(key)) {
			pathSectionList.push(`.${key}`);
		}

		if (Type.Native.Number(key)) {
			pathSectionList.push(`[${key}]`);
		}
	}

	return [
		`Invalid "${pathSectionList.join('')}", one`,
		...(cause.required ? ['required'] : []),
		`"${cause.expected}" expected.`
	].join(' ');
};

export const Normalizer = (schema, CauseMessage = SimpleCauseMessage) => {
	return (_value) => {
		try {
			return schema(_value);
		} catch (cause) {
			const message = CauseMessage(cause);

			throw new TypeError(message);
		}
	};
};