import * as Type from './Type/index.mjs';
import * as Utils from './Utils/index.mjs';
import * as CauseMessage from './Message/index.mjs';

export const Normalizer = (schema, Message = CauseMessage.Simple) => {
	if (!Type.Native.Function(schema)) {
		Utils.throwError('schema', 'function as schema');
	}

	if (!Type.Native.Function(Message)) {
		Utils.throwError('Message', 'function');
	}

	return (_value) => {
		try {
			return schema(_value);
		} catch (cause) {
			const message = Message(cause);

			if (!Type.Native.String(message)) {
				Utils.throwError('message by Message()', 'string');
			}

			throw new TypeError(message);
		}
	};
};