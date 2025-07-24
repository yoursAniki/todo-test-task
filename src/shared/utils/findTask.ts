import type { Task } from "../types/task.types";

/**
 * Рекурсивно ищет задачу по id
 *
 * @param {Task[]} tasks - Массив задач, в котором происходит поиск
 * @param {string} id - id задачи, которую нужно найти
 * @returns {Task|undefined} Найденная задача или undefined, если задача не найдена
 */

export const findTask = (tasks: Task[], id: string): Task | undefined => {
	for (const task of tasks) {
		if (task.id === id) return task;
		if (task.subtasks) {
			const found = findTask(task.subtasks, id);
			if (found) return found;
		}
	}
	return undefined;
};
