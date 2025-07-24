<template>
	<div class="flex flex-col justify-center">
		<div class="project-header py-2 px-4 flex justify-between items-center">
			<input
				v-model="project.name"
				placeholder="Название проекта"
				name="project-name"
			/>
			<close-icon @click="deleteProject" color="white" />
		</div>

		<div
			@click="addTask(project.id)"
			class="flex items-center gap-3 border-2 border-dashed border-t-0 px-2 py-4 cursor-pointer select-none mb-5"
		>
			<close-icon color="black" class="rotate-45" />
			<span>Добавить задачу</span>
		</div>

		<div class="flex flex-col gap-5">
			<task-card
				v-for="(task, index) in project.tasks"
				:index="index"
				:key="task.id"
				:task="task"
				:depth="0"
				@delete-task="deleteTask"
				@update-task="updateTask"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
// components
import { TaskCard } from "../task";
import CloseIcon from "../../../shared/ui/icons/CloseIcon.vue";

import { useProjectStore } from "../../../features/project-list/model/store/projectStore";
import type { Project } from "../../../shared/types/project.types";
import type { CreateTask, Task } from "../../../shared/types/task.types";
import { provide } from "vue";

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
	store.deleteTaskFromProject(props.project.id, taskId);
};

const updateTask = (task: Task) => {
	store.saveTaskToProject(props.project.id, task);
};

provide("projectId", props.project.id);
</script>

<style scoped lang="scss">
.project-header {
	background: $black;
	color: $primary-color;
}
</style>
