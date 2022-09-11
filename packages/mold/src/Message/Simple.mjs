import * as Type from '../Type/index.mjs';

export const SimpleCauseMessage = cause => {
	const pathSectionList = [];

	for (const node of cause.path) {
		if (Type.Native.String(node.key)) {
			pathSectionList.push(`.${node.key}`);
		}

		if (Type.Native.Number(node.key)) {
			pathSectionList.push(`[${node.key}]`);
		}
	}

	return [
		`Invalid "${pathSectionList.join('')}", one`,
		...(cause.required ? ['required'] : []),
		`"${cause.expected}" expected.`
	].join(' ');
};
