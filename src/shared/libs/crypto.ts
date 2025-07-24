import CryptoJS from "crypto-js";

export const encryptAES = (data: object, key: string): string => {
	const json = JSON.stringify(data);
	return CryptoJS.AES.encrypt(json, key).toString();
};

export const decryptAES = (token: string, key: string): object | null => {
	try {
		const bytes = CryptoJS.AES.decrypt(token, key);
		const decrypted = bytes.toString(CryptoJS.enc.Utf8);
		return JSON.parse(decrypted);
	} catch (e) {
		console.log(e);
		return null;
	}
};
