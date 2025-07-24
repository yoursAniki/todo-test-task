<template>
	<div class="flex flex-col justify-center">
		<div class="project-header py-2 px-4 flex justify-between items-center">
			<input
				v-model="project.name"
				placeholder="Название проекта"
				name="project-name"
			/>
			<close @click="deleteProject" color="white" />
		</div>

		<task-card
			v-for="task in project.tasks"
			:key="task.id"
			:task="task"
			@delete-task="deleteTask"
			@update-task="updateTask"
		/>

		<div
			@click="addTask(project.id)"
			class="flex items-center gap-3 border-2 border-dashed border-t-0 px-2 py-4 cursor-pointer select-none"
		>
			<close color="black" class="rotate-45" />
			<span>Добавить задачу</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
// components
import { TaskCard } from "../task";
import Close from "../../../shared/ui/icons/Close.vue";

import { useProjectStore } from "../../../features/project-list/model/store/projectStore";
import type { Project } from "../../../shared/types/project.types";
import type { CreateTask, Task } from "../../../shared/types/task.types";

const props = defineProps<{
	project: Project;
}>();

const emit = defineEmits(["delete-project", "add-task"]);

const store = useProjectStore();

const deleteProject = () => emit("delete-project", props.project.id);

const addTask = (projectId: string) => {
	const taskTemplate: CreateTask = {
		title: "",
		tags: [],
		subtasks: [],
	};

	store.addTaskToProject(taskTemplate, projectId);
};

const deleteTask = (taskId: string) => {
	console.log(props.project.id, taskId, "tags");
	store.deleteTaskFromProject(props.project.id, taskId);
};

const updateTask = (task: Task) => {
	store.saveTaskToProject(props.project.id, task);
};
</script>

<style scoped lang="scss">
.project-header {
	background: $black;
	color: $primary-color;
}
</style>
