// randomId returns a random twelve character string. It is suitable as a
// unique ID for non-cryptographic applications, e.g. HTML element id.
export const randomId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

	let result = '';
	for (let i=0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
