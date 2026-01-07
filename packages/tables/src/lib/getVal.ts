export const getVal = (
	value: number | string,
	selector:
		| string
		| number
		| ((val: string | number) => string)
		| ((val: string) => string)
		| ((val: number) => string)
		| ((val: string | number) => number)
		| ((val: string) => number)
		| ((val: number) => number)
): string | number => {
	if (typeof selector === 'function') {
		return (selector as (val: string | number) => string | number)(value);
	}
	return selector;
};
