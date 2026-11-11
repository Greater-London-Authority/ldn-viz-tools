type ThemeObject<T> = {
	[key: string]: T | ThemeObject<T>;
};

export const tokenNameToValue = (colorName: string, theme: ThemeObject<any>) => {
	let val = theme;
	for (const part of colorName.split('.')) {
		if (val && val[part]) {
			val = val[part];
		} else if (val && val.default && val.default[part]) {
			val = val.default[part];
		} else {
			console.error(`Color name "${colorName}" not defined in theme.`);
			return undefined as unknown as string;
		}
	}

	if (typeof val === 'object') {
		return val.default as unknown as string;
	}

	return val as unknown as string;
};
