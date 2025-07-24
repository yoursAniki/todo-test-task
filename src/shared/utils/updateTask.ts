import type { Task } from "../types/task.types";

/**
 * Рекурсивно обновляет задачу в дереве задач по её id
 * Если задача найдена, она заменяется на обновлённую версию, а поле updatedAt устанавливается в текущее время
 *
 * @param {Task[]} tasks - Массив задач, в котором происходит поиск и обновление
 * @param {Task} updatedTask - Обновлённая задача, которой нужно заменить существующую
 * @returns {boolean} Возвращает true, если задача была найдена и обновлена, иначе false
 */

export const updateTaskRecursive = (
	tasks: Task[],
	updatedTask: Task
): boolean => {
	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].id === updatedTask.id) {
			const subtasks = updatedTask.subtasks ?? tasks[i].subtasks ?? [];
			tasks[i] = {
				...updatedTask,
				subtasks,
				updatedAt: new Date(),
			};
			return true;
		}
		if (
			tasks[i].subtasks &&
			updateTaskRecursive(tasks[i].subtasks, updatedTask)
		) {
			return true;
		}
	}
	return false;
};
