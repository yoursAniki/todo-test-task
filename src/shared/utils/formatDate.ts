/**
 * Форматирует объект даты в строку в удобном для чтения формате
 *
 * @param {Date} date - Дата для форматирования
 * @returns {string} Строка с датой и временем в локальном формате
 */

export const formatDate = (date: Date): string => {
	const resultDate = date instanceof Date ? date : new Date(date);

	return resultDate.toLocaleString();
};
