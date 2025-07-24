import type { Task } from "../types/task.types";

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
