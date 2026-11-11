export const isConstructor = (obj: any) => {
	return !!obj.prototype && !!obj.prototype.constructor.name;
};
