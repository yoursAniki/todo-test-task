import type { Task } from "../types/task.types";

/**
 * Рекурсивно обновляет поле updatedAt у всех родительских задач,
 * если среди их подзадач есть задача с указанным id
 *
 * @param {Task[]} tasks - Массив задач, в котором происходит поиск родителей
 * @param {string} childId - Идентификатор дочерней задачи, для которой нужно обновить updatedAt у родителей
 * @param {Date} date - Новое значение для поля updatedAt
 * @returns {boolean} Возвращает true, если хотя бы у одного родителя было обновлено поле updatedAt, иначе false
 */

export const updateParentUpdatedAt = (
	tasks: Task[],
	childId: string,
	date: Date
): boolean => {
	for (const task of tasks) {
		if (task.subtasks && task.subtasks.some(sub => sub.id === childId)) {
			task.updatedAt = date;
			return true;
		}
		if (task.subtasks && updateParentUpdatedAt(task.subtasks, childId, date)) {
			task.updatedAt = date;
			return true;
		}
	}
	return false;
};
