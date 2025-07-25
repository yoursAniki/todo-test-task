import { defineStore } from "pinia";
import type {
	Project,
	CreateProject,
} from "../../../../shared/types/project.types";
import type { Task, CreateTask } from "../../../../shared/types/task.types";
import { TaskStatus } from "../../../../shared/types/task.types";
import { v4 as uuidv4 } from "uuid";
import { findTask } from "../../../../shared/utils/findTask";
import { loadAppData, saveAppData } from "../../../../shared/libs/localStorage";
import { updateTaskRecursive } from "../../../../shared/utils/updateTask";
import { updateParentUpdatedAt } from "../../../../shared/utils/updateParentDate";

export const useProjectStore = defineStore("projects", {
	state: () => ({
		projects: [] as Project[],
	}),

	actions: {
		init() {
			const { projects } = loadAppData();

			this.projects = projects;
		},

		save() {
			const appData = loadAppData();
			saveAppData({ ...appData, projects: this.projects });
		},

		exportData() {
			return {
				projects: this.projects,
			};
		},

		importData(data: { projects: Project[] }) {
			this.projects = data.projects;
			this.save();
		},

		addProject(project: CreateProject) {
			const id = uuidv4();

			this.projects.push({ ...project, id });

			this.save();
		},

		deleteProject(id: string) {
			this.projects = this.projects.filter(p => p.id !== id);

			this.save();
		},

		deleteAllProjects() {
			this.projects = [];

			this.save();
		},

		updateProjectName(id: string, newName: string) {
			const project = this.projects.find(p => p.id === id);

			if (!project) return;

			project.name = newName;

			this.save();
		},

		addTaskToProject(task: CreateTask, projectId: string) {
			const project = this.projects.find(p => p.id === projectId);

			if (!project) return;

			const createdAt = new Date();
			const updatedAt = new Date();
			const status = TaskStatus.Todo;
			const id = uuidv4();

			project.tasks.push({
				...task,
				createdAt,
				updatedAt,
				status,
				id,
			});

			this.save();
		},

		deleteTaskFromProject(projectId: string, taskId: string) {
			const project = this.projects.find(p => p.id === projectId);

			if (!project) return;

			project.tasks = project.tasks.filter(t => t.id !== taskId);

			this.save();
		},

		saveTaskToProject(projectId: string, task: Task) {
			const project = this.projects.find(p => p.id === projectId);

			if (!project) return;

			updateTaskRecursive(project.tasks, task);

			updateParentUpdatedAt(project.tasks, task.id, new Date());

			this.save();
		},

		deleteSubtaskFromProject(projectId: string, taskId: string) {
			const project = this.projects.find(p => p.id === projectId);

			if (!project) return;

			const updatedAt = new Date();

			const deleteTaskRecursive = (tasks: Task[], id: string): boolean => {
				const index = tasks.findIndex(t => t.id === id);
				if (index !== -1) {
					tasks.splice(index, 1);
					return true;
				}

				for (const task of tasks) {
					if (task.subtasks && deleteTaskRecursive(task.subtasks, id)) {
						task.updatedAt = updatedAt;
						return true;
					}
				}
				return false;
			};

			deleteTaskRecursive(project.tasks, taskId);

			this.save();
		},

		addSubtaskToTask(
			projectId: string,
			parentTaskId: string,
			subtask: CreateTask
		) {
			const project = this.projects.find(p => p.id === projectId);
			if (!project) return;

			const parentTask = findTask(project.tasks, parentTaskId);
			if (!parentTask) return;

			if (!parentTask.subtasks) parentTask.subtasks = [];

			const createdAt = new Date();
			const updatedAt = new Date();
			const status = TaskStatus.Todo;
			const id = uuidv4();

			parentTask.updatedAt = new Date();

			parentTask.subtasks.push({
				...subtask,
				createdAt,
				updatedAt,
				status,
				id,
				subtasks: [],
			});

			updateParentUpdatedAt(project.tasks, parentTaskId, updatedAt);

			this.save();
		},

		updateSubtaskInProject(projectId: string, updatedTask: Task) {
			this.saveTaskToProject(projectId, updatedTask);

			this.save();
		},
	},
});
