export const CustomSchema = (normalize) => {
	return (role = '') => (_value, _empty) => normalize(role, _value, _empty);
};
