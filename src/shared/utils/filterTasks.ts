import type { Project } from "../types/project.types";
import type { Task, TaskStatus } from "../types/task.types";

const filterTasksRecursive = (
	tasks: Task[],
	statuses: TaskStatus[],
	tags: string[],
	search: string
): Task[] => {
	return tasks
		.map(task => {
			const filteredSubtasks = task.subtasks
				? filterTasksRecursive(task.subtasks, statuses, tags, search)
				: [];

			const statusOk = !statuses.length || statuses.includes(task.status);
			const tagsOk = !tags.length || tags.every(tag => task.tags.includes(tag));
			const searchOk =
				!search || task.title.toLowerCase().includes(search.toLowerCase());

			if ((statusOk && tagsOk && searchOk) || filteredSubtasks.length) {
				return {
					...task,
					subtasks: filteredSubtasks,
				};
			}
			return null;
		})
		.filter(Boolean) as Task[];
};

export const filterProjectsWithTasks = (
	projects: Project[],
	statuses: TaskStatus[],
	tags: string[],
	search: string
): Project[] => {
	return projects.map(project => {
		const filteredTasks = filterTasksRecursive(
			project.tasks,
			statuses,
			tags,
			search
		);
		return {
			...project,
			tasks: filteredTasks,
		};
	});
};
