export const getVal = (
	value: number | string,
	selector:
		| string
		| number
		| ((val: string | number) => string)
		| ((val: string | number) => number)
) => {
	if (typeof selector === 'function') {
		return selector(value);
	}
	return selector;
};
