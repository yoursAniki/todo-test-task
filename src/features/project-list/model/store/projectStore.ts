import { defineStore } from "pinia";
import type {
	Project,
	CreateProject,
} from "../../../../shared/types/project.types";
import type { Task, CreateTask } from "../../../../shared/types/task.types";
import { TaskStatus } from "../../../../shared/types/task.types";
import { v4 as uuidv4 } from "uuid";
import { findTask } from "../../../../shared/utils/findTask";

export const useProjectStore = defineStore("projects", {
	state: () => ({
		projects: [] as Project[],
	}),

	actions: {
		init() {
			try {
				const data = localStorage.getItem("projects");

				this.projects = data ? JSON.parse(data) : [];
			} catch (e) {
				console.error(e);

				this.projects = [];
			}
		},

		addProject(project: CreateProject) {
			const id = uuidv4();

			this.projects.push({ ...project, id });
		},

		deleteProject(id: string) {
			this.projects = this.projects.filter(p => p.id !== id);
		},

		deleteAllProjects() {
			this.projects = [];
		},

		updateProjectName(id: string, newName: string) {
			const project = this.projects.find(p => p.id === id);

			if (!project) return;

			project.name = newName;
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
		},

		deleteTaskFromProject(projectId: string, taskId: string) {
			const project = this.projects.find(p => p.id === projectId);

			if (!project) return;

			project.tasks = project.tasks.filter(t => t.id !== taskId);
		},

		saveTaskToProject(projectId: string, task: Task) {
			const project = this.projects.find(p => p.id === projectId);

			if (!project) return;

			const index = project.tasks.findIndex(t => t.id === task.id);

			const resultTask = JSON.parse(JSON.stringify(task));

			project.tasks[index] = {
				...resultTask,
				updatedAt: new Date(),
			};
		},

		deleteSubtaskFromProject(projectId: string, taskId: string) {
			const project = this.projects.find(p => p.id === projectId);
			if (!project) return;

			const deleteTaskRecursive = (tasks: Task[], id: string): boolean => {
				const index = tasks.findIndex(t => t.id === id);
				if (index !== -1) {
					tasks.splice(index, 1);
					return true;
				}

				for (const task of tasks) {
					if (task.subtasks && deleteTaskRecursive(task.subtasks, id)) {
						return true;
					}
				}
				return false;
			};

			deleteTaskRecursive(project.tasks, taskId);
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

			parentTask.subtasks.push({
				...subtask,
				createdAt,
				updatedAt,
				status,
				id,
				subtasks: [],
			});
		},

		updateSubtaskInProject(projectId: string, updatedTask: Task) {
			const project = this.projects.find(p => p.id === projectId);
			if (!project) return;

			const updateTaskRecursive = (tasks: Task[], task: Task): boolean => {
				const index = tasks.findIndex(t => t.id === task.id);
				if (index !== -1) {
					tasks[index] = {
						...JSON.parse(JSON.stringify(task)),
						updatedAt: new Date(),
					};
					return true;
				}
				for (const t of tasks) {
					if (t.subtasks && updateTaskRecursive(t.subtasks, task)) {
						return true;
					}
				}
				return false;
			};

			updateTaskRecursive(project.tasks, updatedTask);
		},
	},

	persist: true,
});
