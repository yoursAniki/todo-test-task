export const formatDate = (date: Date) => {
	const resultDate = date instanceof Date ? date : new Date(date);

	return resultDate.toLocaleString();
};
