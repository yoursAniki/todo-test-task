<template>
	<div class="task-card flex flex-col" :class="computeStatusColor">
		<div class="flex items-center justify-between gap-3 px-4 py-2">
			<input
				v-model="taskData.title"
				placeholder="Название задачи"
				class="px-2 py-1"
				name="title"
				type="text"
			/>
			<select v-model="taskData.status" name="status">
				<option v-for="status in TaskStatus" :key="status">{{ status }}</option>
			</select>

			<tag-list v-model="taskData.tags" />

			<div class="flex flex-col gap-1">
				<span class="text-s"
					>Создано: {{ formatDate(props.task.createdAt) }}</span
				>
				<span class="text-s"
					>Обновлено: {{ formatDate(props.task.updatedAt) }}</span
				>
			</div>

			<trash @click="deleteTask" color="red" />
		</div>

		<div v-if="isDataChanged" class="flex justify-center gap-3 pb-2">
			<primary-button
				@click="saveTask"
				text="Сохранить"
				class="save-button"
				color="accept"
			/>

			<primary-button @click="resetTask" text="Отмена" color="reject" />
		</div>
	</div>
</template>

<script lang="ts" setup>
// components
import TagList from "./TagList.vue";
import { PrimaryButton } from "../../../../shared/ui/primary-button";
import Trash from "../../../../shared/ui/icons/Trash.vue";

import { computed, ref } from "vue";
import type { Task } from "../../../../shared/types/task.types";
import { TaskStatus } from "../../../../shared/types/task.types";
import { formatDate } from "../../../../shared/utils/formatDate";

const props = defineProps<{
	task: Task;
}>();

const emit = defineEmits(["delete-task", "update-task"]);

const deleteTask = () => emit("delete-task", props.task.id);

const computeStatusColor = computed(() => {
	if (taskData.value.status === TaskStatus.Todo) return "status-todo";
	if (taskData.value.status === TaskStatus.InProgress)
		return "status-in-progress";
	if (taskData.value.status === TaskStatus.Done) return "status-done";
});

const taskTemplate = {
	id: props.task.id,
	title: "",
	status: TaskStatus.Todo,
	tags: [],
	subtasks: [],
	createdAt: props.task.createdAt,
	updatedAt: props.task.updatedAt,
};

const isDataChanged = computed(() => {
	console.log(taskData.value, props.task);
	return !(
		taskData.value.title === props.task.title &&
		taskData.value.status === props.task.status &&
		JSON.stringify(taskData.value.tags) === JSON.stringify(props.task.tags) &&
		JSON.stringify(taskData.value.subtasks) ===
			JSON.stringify(props.task.subtasks)
	);
});

const taskData = ref<Task>(structuredClone(taskTemplate));

if (isDataChanged.value)
	taskData.value = JSON.parse(JSON.stringify(props.task));

const saveTask = () => {
	emit("update-task", taskData.value);
};
const resetTask = () => {
	taskData.value = JSON.parse(JSON.stringify(props.task));
};
</script>

<style scoped lang="scss">
.task-card {
	border: 2px solid $black;
	border-top: none;

	&.status-todo {
	}

	&.status-in-progress {
		background: $yellow;
	}

	&.status-done {
		background: $accept-color;

		.save-button {
			background: $black;
		}
	}
}
</style>
