import * as CauseMessage from './Message/index.mjs';

export const Normalizer = (schema, Message = CauseMessage.Simple) => {
	return (_value) => {
		try {
			return schema(_value);
		} catch (cause) {
			throw new TypeError(Message(cause));
		}
	};
};