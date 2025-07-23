export enum TaskStatus {
	Todo = "todo",
	InProgress = "in-progress",
	Done = "done",
}

export interface Task {
	id: string;
	title: string;
	status: TaskStatus;
	tags: string[];
	subtasks: Task[];
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateTask
	extends Omit<Task, "createdAt" | "updatedAt" | "status"> {}
