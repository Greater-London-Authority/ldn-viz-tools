
// classNames receives zero or more arguments as strings: any which are empty are discarded,
// then the remainder are joined together (separated by a space character) and returned as a single string

export const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(' ');
};
