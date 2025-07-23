import type { Task } from "./task.types";

export interface Project {
	id: string;
	name: string;
	tasks: Task[];
}

export interface CreateProject extends Omit<Project, "id"> {}
