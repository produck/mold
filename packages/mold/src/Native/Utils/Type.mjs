import * as Base from '../Base/index.mjs';

const isNull = any => any === null;
const isArray = any => Array.isArray(any);

const isPlainObjectLike = any => {
	return Base.Type.Object(any) && !isNull(any) && !isArray(any);
};

export {
	isNull as Null,
	isArray as Array,
	isPlainObjectLike as PlainObjectLike
};