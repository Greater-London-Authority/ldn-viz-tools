export const newEnterKeyHandler = (handler: (e: KeyboardEvent) => any) => {
	const ENTER_KEY = 13;
	return (e: KeyboardEvent) => {
		if (e.keyCode === ENTER_KEY) {
			handler(e);
		}
	};
};

interface Styles {
	[key: string]: any
}

const asCleanString = (v: any) => (v ? v.toString().trim() : '');
const toCleanValues = ([k, v]: [string, any]) => [k, asCleanString(v)];
const notEmpty = (pair: any[]) => !!pair[1];
const asString = ([k, v]: any[]) => `${k}: ${v}`;

export const toCSS = (styles: Styles) =>
	Object.entries(styles).map(toCleanValues).filter(notEmpty).map(asString).join(';') + ';';

export default {
	newEnterKeyHandler,
	toCSS
};
