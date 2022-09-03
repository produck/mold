import * as Schema from './Schema/index.mjs';

export const DefaultCauseMessage = cause => {
	const pathSectionList = [];

	for (const key of cause.path) {
		if (Schema.Internal.Type.String(key)) {
			pathSectionList.push(`.${key}`);
		}

		if (Schema.Internal.Type.Number(key)) {
			pathSectionList.push(`[${key}]`);
		}
	}

	return [
		`Invalid "${pathSectionList.join('')}", one`,
		...(cause.required ? ['required'] : []),
		`"${cause.expected}" expected.`
	].join(' ');
};

export const Normalizer = (schema, CauseMessage = DefaultCauseMessage) => {
	return (...args) => {
		try {
			return schema(...args);
		} catch (cause) {
			const message = CauseMessage(cause);

			throw new TypeError(message);
		}
	};
};