import type { Task } from "../types/task.types";

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
