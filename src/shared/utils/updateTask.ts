import type { Task } from "../types/task.types";

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
