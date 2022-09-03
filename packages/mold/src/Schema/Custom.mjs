export const CustomSchema = (normalize) => {
	return (_value, _empty) => normalize(_value, _empty);
};
