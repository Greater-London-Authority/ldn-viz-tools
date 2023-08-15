// classNames receives zero or more arguments as strings: any which are empty
// are discarded, then the remainder are joined together (separated by a space
// character) and returned as a single string
export const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(' ');
};

// newEnterKeyHandler wraps a handler for keyboard events and only invokes it
// when an enter key is pressed. 
export const newEnterKeyHandler = (handler: (e: KeyboardEvent) => any) => {
	return (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			handler(e);
		}
	};
};

interface Styles {
	[key: string]: any
}

// objectToCSS converts key value pairs of an object into a CSS string.
export const objectToCSS = (styles: Styles) =>
	Object.entries(styles).map(toCleanValue).filter(noneEmptyValues).map(pairToString).join(';') + ';';

const toCleanValue = ([k, v]: [string, any]) => {
	v = (v ? v.toString().trim() : '')
	return [k, v]
};
const noneEmptyValues = (pair: any[]) => !!pair[1];
const pairToString = ([k, v]: any[]) => `${k}: ${v}`;

export default {
	classNames,
	newEnterKeyHandler,
	objectToCSS
};
