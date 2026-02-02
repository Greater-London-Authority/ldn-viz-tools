type ThemeObject<T> = {
	[key: string]: T | ThemeObject<T>;
};

export const tokenNameToValue = (colorName: string, theme: ThemeObject<any>) => {
	let val = theme;
	for (const part of colorName.split('.')) {
		if (val[part]) {
			val = val[part];
		} else if (val.default[part]) {
			val = val.default[part];
		} else {
			console.error(`Color name "${colorName}" not defined in theme.`);
		}
	}

	if (typeof val === 'object') {
		return val.default as unknown as string;
	}

	return val as unknown as string;
};
