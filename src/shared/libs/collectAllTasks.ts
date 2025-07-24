import type { Project } from "../types/project.types";
import type { Task } from "../types/task.types";

export const collectAllTasks = (projects: Project[]) => {
	const result: Array<Task & { projectId: string; projectName: string }> = [];

	const traverse = (tasks: Task[], projectId: string, projectName: string) => {
		for (const task of tasks) {
			result.push({
				...task,
				projectId,
				projectName,
			});
			if (task.subtasks && task.subtasks.length) {
				traverse(task.subtasks, projectId, projectName);
			}
		}
	};

	for (const project of projects) {
		traverse(project.tasks, project.id, project.name);
	}

	return result;
};
