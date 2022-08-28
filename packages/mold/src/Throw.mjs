const throwError = (message, ErrorConstructor = Error) => {
	throw new ErrorConstructor(message);
};

export default throwError;

const throwEvalError = message => throwError(message, EvalError);
const throwRangeError = message => throwError(message, RangeError);
const throwReferenceError = message => throwError(message, ReferenceError);
const throwSyntaxError = message => throwError(message, SyntaxError);
const throwTypeError = message => throwError(message, TypeError);
const throwURIError = message => throwError(message, URIError);

export {
	throwError as Error,
	throwEvalError as EvalError,
	throwRangeError as RangeError,
	throwReferenceError as ReferenceError,
	throwSyntaxError as SyntaxError,
	throwTypeError as TypeError,
	throwURIError as URIError,
};