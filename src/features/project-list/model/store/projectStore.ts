import { defineStore } from "pinia";
import type {
	Project,
	CreateProject,
} from "../../../../shared/types/project.types";
import type { Task, CreateTask } from "../../../../shared/types/task.types";
import { TaskStatus } from "../../../../shared/types/task.types";
import { v4 as uuidv4 } from "uuid";

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

		addTaskToProject(task: CreateTask) {
			const projectId = task.id;

			const project = this.projects.find(p => p.id === projectId);

			if (!project) return;

			const createdAt = new Date();
			const updatedAt = new Date();
			const status = TaskStatus.Todo;

			project.tasks.push({
				...task,
				createdAt,
				updatedAt,
				status,
			});
		},
	},
	persist: true,
});
