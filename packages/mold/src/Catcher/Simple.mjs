import * as Type from '../Type/index.mjs';
import * as Utils from '../Utils/index.mjs';

export function* CauseReader(cause) {
	let current = cause;

	while (Type.Helper.Error(current) || current instanceof Utils.MoldCause) {
		yield current;
		current = current.next;
	}
}

const UPDATE_VALUE_DETAIL = (cause, state) => {
	state.required = cause.detail.required;
	state.expected = cause.detail.expected;
};

const CauseTypeHandler = {
	['SimplexRequired']: UPDATE_VALUE_DETAIL,
	['Value']: UPDATE_VALUE_DETAIL,
	['ArrayLength']: (cause, state) => {
		const { minLength, maxLength } = cause.detail;

		UPDATE_VALUE_DETAIL(cause, state);
		state.tail = `Length should be [${minLength}, ${maxLength}]`;
	},
	['ArrayKey']: (cause, state) => {
		UPDATE_VALUE_DETAIL(cause, state);
		state.tail = `The element at [${cause.detail.index}] is duplicated.`;
	},
	['ArrayItem']: (cause, state) => state.path.push({
		type: 'array',
		value: cause.detail.index,
	}),
	['ObjectProperty']: (cause, state) => state.path.push({
		type: 'object',
		value: cause.detail.key,
	}),
	['TupleElement']: (cause, state) => state.path.push({
		type: 'tuple',
		value: cause.detail.index,
	}),
};

const SectionSerializer = {
	['object']: key => `.${key}`,
	['array']: index => `[${index}]`,
	['tuple']: index => `<${index}>`,
};

export const SimpleCatcher = topCase => {
	const state = {
		path: [],
		required: false,
		expected: 'unknown',
		tail: null,
	};

	for (const cause of CauseReader(topCase)) {
		if (!cause.type) {
			state.tail = cause;
		}

		const handler = CauseTypeHandler[cause.type];

		if (Type.Native.Function(handler)) {
			handler(cause, state);
		}
	}

	const pathRole = state.path
		.map(section => SectionSerializer[section.type](section.value))
		.join('');

	const sectionList = [
		`Invalid "${pathRole}", one `,
		...(state.required ? ['required '] : []),
		`"${state.expected}" expected.`,
	];

	if (!Type.Helper.Null(state.tail)) {
		sectionList.push(`\n${String(state.tail)}`);
	}

	const message = sectionList.join('');

	throw new TypeError(message);
};
