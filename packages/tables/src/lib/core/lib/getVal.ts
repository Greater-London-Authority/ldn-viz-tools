export const getVal = (
	value: number,
	selector: string | number | ((val: number) => string) | ((val: number) => number)
) => {
	if (typeof selector === 'function') {
		return selector(value);
	}
	return selector;
};
