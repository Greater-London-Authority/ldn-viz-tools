export const unEsriResponse = (dataResponse: { [key: string]: any }) => {
	return dataResponse.features.map((d: any) => ({
		...d.attributes,
		rando: Math.random() * 100
	}));
};
