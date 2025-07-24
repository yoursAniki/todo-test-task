import type { TaskStatus } from "../../../../shared/types/task.types";

export interface Filter {
	statuses: TaskStatus[];
	tags: string[];
	search: string;
}
