// randomId returns a random twelve character string. It is suitable as a
// unique ID for non-cryptographic applications, e.g. HTML element id.
export const randomId = () => {
	const uuid = crypto.randomUUID();
	return uuid.slice(uuid.length - 12);
};
